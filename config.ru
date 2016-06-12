require 'rubygems'
require 'middleman/rack'
require "rack/contrib/try_static"
require 'rack/rewrite'

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
  r301 %r{.*}, 'http://www.nandomoreira.me$&', :if => Proc.new {|rack_env|
    rack_env['SERVER_NAME'] != 'nandomoreira.me'
  }

  r301 %r{.*}, 'http://nandomoreira.herokuapp.com$&', :if => Proc.new {|rack_env|
    rack_env['SERVER_NAME'] != 'nandomoreira.me'
  }

  r301 %r{.*}, 'http://www.nandomoreira.herokuapp.com$&', :if => Proc.new {|rack_env|
    rack_env['SERVER_NAME'] != 'nandomoreira.me'
  }
end

# Build the static site when the app boots
# `bundle exec middleman build`

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
    not_found_page = File.expand_path("build/404.html", __FILE__)
    if File.exist?(not_found_page)
      [ 404, { 'Content-Type'  => 'text/html'}, [ File.read(not_found_page) ] ]
    else
      [ 404, { 'Content-Type'  => 'text/html' }, [ '404 - page not found' ] ]
    end
  ]
}
