###
# Blog settings
###

# Time.zone = "UTC"
Time.zone = "America/Sao_Paulo"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "/{title}"
  # Matcher for blog source files
  blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.taglink = "tags/{tag}.html"

  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250

  blog.year_link = "{year}.html"
  blog.month_link = "{year}/{month}.html"
  blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".{markdown,md}"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end

activate :disqus do |d|
  d.shortname = 'fernandomoreira'
end

set :site_url, 'http://nandomoreira.me'
set :site_title, 'Fernando Moreira | Front-end developer'
set :site_author, 'Fernando Moreira'
set :site_description, 'Front-end developer'
set :site_keywords, 'html, css, css3, html5, javascript, js, front-end, developer, middleman, jekyll, wordpress, php, ruby'
set :twitter, '@Pia_Frontend'
set :site_author_image, 'avatar.jpg'
set :social_twitter, 'https://twitter.com/Pia_Frontend'
set :social_github, 'https://github.com/nandomoreirame'
set :social_linkedin, 'https://br.linkedin.com/in/nandomoreirame'

# i18n
activate :i18n do |l|
  l.path = "/:locale/"
  l.mount_at_root = :en
  l.no_fallbacks = true
end

page "/feed.xml", layout: false
page "/sitemap.xml", layout: false
page "/blog.html", layout: "blog"
page "/posts/*.html", layout: "posts"

# Title
activate :title, site: 'Fernando Moreira | Front-end developer', separator: ' — '

# Metatags
activate :meta_tags

# Sitemap
set :url_root, 'http://nandomoreira.me/'
activate :search_engine_sitemap, default_priority: 0.5,
                                 default_change_frequency: "always"

###
# Compass
###

# Change Compass configuration
compass_config do |config|
  config.output_style = :expanded
  config.line_comments = false
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Reload the browser automatically whenever files change
configure :development do
  set :debug_assets, true
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  def local_path(path, options={})
    lang = options[:language] ? options[:language] : I18n.locale.to_s

    if lang != "en"
      "/#{lang}/#{path}"
    else
      "/#{path}"
    end
  end

  def other_langs
    langs - [I18n.locale]
  end
end

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
# set :build_dir, 'tmp'

activate :directory_indexes
set :index_file, "index.html"
page "/404.html", :directory_index => false

# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes
activate :automatic_alt_tags

# syntax
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true,
               :autolink => true,
               :smartypants => true

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_html
  activate :minify_javascript
  activate :gzip
  activate :asset_hash
  activate :cache_buster
  set :google_analytics_account, 'UA-52446115-1'
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'master' # or gh-pages

  committer_app = "#{Middleman::Deploy::PACKAGE} v#{Middleman::Deploy::VERSION}"
  commit_message = "Deployed using #{committer_app}"

  if ENV["TRAVIS_BUILD_NUMBER"] then
    commit_message += " (Travis Build \##{ENV["TRAVIS_BUILD_NUMBER"]})"
  end

  deploy.commit_message = commit_message
end
