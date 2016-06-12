require 'rubygems'
require 'middleman/rack'
require "rack/contrib/try_static"
require 'rack/rewrite'

# Build the static site when the app boots
`bundle exec middleman build`

# run Middleman.server
module Rack

  class TryStatic

    def initialize(app, options)
      @app = app
      @try = ['', *options.delete(:try)]
      @static = ::Rack::Static.new(lambda { [404, {}, []] }, options)
    end

    def call(env)
      orig_path = env['PATH_INFO']
      found = nil
      @try.each do |path|
        resp = @static.call(env.merge!({'PATH_INFO' => orig_path + path}))
        break if 404 != resp[0] && found = resp
      end
      found or @app.call(env.merge!('PATH_INFO' => orig_path))
    end
  end
end

use Rack::Rewrite do
  r301 %r{.*}, 'http://nandomoreira.me$&', :if => Proc.new { | rack_env |
    rack_env['SERVER_NAME'] != 'nandomoreira.me'
  }
end

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
