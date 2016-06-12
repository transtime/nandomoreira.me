require 'rubygems'
require 'middleman/rack'
require "rack/contrib/try_static"

# run Middleman.server

# Build the static site when the app boots
`bundle exec middleman build`

# Enable proper HEAD responses
use Rack::Head
# Attempt to serve static HTML files
use Rack::TryStatic,
    :root => "build",
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']

# Serve a 404 page if all else fails
run lambda { |env|
  [
    404,
    {
      "Content-Type" => "text/html",
      "Cache-Control" => "public, max-age=60"
    },
    File.open("build/404.html", File::RDONLY)
  ]
}

# heroku config:set REDIRECTS="{'www.nandomoreira.me'=>'nandomoreira.me', 'nandomoreira.herokuapp.com'=>'nandomoreira.me', 'www.nandomoreira.herokuapp.com'=>'nandomoreira.me'}"
REDIRECTS = eval(ENV['REDIRECTS'] || '') || {}

use Rack::Rewrite do
  REDIRECTS.each do |from, to|
    r301 %r{.*}, "http://#{to}$&", if: -> (env) { env['SERVER_NAME'] == from }
  end
end

# Fall back to default app (empty).
run -> (env) { [200, {}, []] }
