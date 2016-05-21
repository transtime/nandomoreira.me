# If you have OpenSSL installed, we recommend updating
# the following line to use "https"
source 'http://rubygems.org'

ruby "2.2.4"

gem 'middleman', '~> 3.3.12'
gem 'middleman-blog', '~> 3.5.3'
gem 'middleman-gh-pages'
gem 'middleman-syntax'
gem 'middleman-slim'
gem 'middleman-deploy'
gem 'middleman-title'
gem 'middleman-meta-tags'
gem 'middleman-search_engine_sitemap' # for sitemap
gem 'middleman-minify-html'
gem "middleman-disqus" # for comments

gem "rack-contrib"
gem "puma"

gem 'nokogiri' # for article.summary

gem 'sass-media_query_combiner' # for combine media query

gem 'redcarpet'

###
# Front-end assets
###
gem 'bourbon', '~> 4.2', '>= 4.2.6'
gem 'neat', '~> 1.7', '>= 1.7.4'
gem 'sass', '~> 3.4', :require => false

###
# Development environment
###
gem 'middleman-livereload'
group :development do
  gem 'foreman'
end

# For feed.xml.builder
gem 'builder', '~> 3.0'
