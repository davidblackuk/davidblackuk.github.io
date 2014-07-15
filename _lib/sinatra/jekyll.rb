require 'liquid'
require 'jekyll/core_ext'
require 'jekyll/convertible'
require 'jekyll/filters'
require 'jekyll/tags/include'

class MyHash < Hash
  
  def initialize(site, base)
    @site = site
    @base = base
    super()
  end
  
  def [](key)
    v = super(key)
    if not key.nil? and v.nil?
      v = self.[]=(key, JekyllLayout.new(@site, @base, key))
    end
    v
  end
  
  def []=(key, value)
    super(key, value)
  end
  
end

class JekyllLayout
  include Jekyll::Convertible
  
  attr_accessor :site
  attr_accessor :name, :ext, :basename, :dir
  attr_accessor :data, :content, :output
  
  @@layouts = {}
  
  def initialize(site, base, template)
    file = "#{template}.html"
    
    
    @site = site
    @base = base
    @name = file
    
    self.process(file)
    self.read_yaml(base, file)
    
    self.class.layouts(site, base)
    
    self.class.layouts["#{template}"] = self
  end

  def process(name)
    self.ext = File.extname(name)
  end

  def get_layout(name)
    if self.class.layouts.key? name
      layout = self.class.layouts[name]
    end
  end
  
  def self.layouts(*args)
    if args.length == 2
      site = args.first
      base = args.last
    end
    @layouts ||= MyHash.new(site, base)
  end
end

module Sinatra
  module Templates
    def jekyll(template, options={}, locals={})
      
      # Find the path, etc.
      views = self.class.views || "./views"
      file = "#{template}.html"
      path = ::File.join(views, file)

      # Create the layout object
      layout = JekyllLayout.new(self, views, template)
      
      self.class.templates[template] = {
        :template => ::File.read(path),
        :filename => path, 
        :line => 1,
        :jekyll => layout
        }
        
      render :jekyll, template, options, locals
    end

    def source
      '.'
    end

  private
  
    def render_jekyll(template, data, options, locals, &block)
      views = self.class.views || "./views"
      file = "#{template}.html"
      
      tem = JekyllLayout.new(self, views, template)
      
      values = {}
      values.deep_merge(tem.data)
      self.instance_variables.each do |name|
        values[name[1..-1]] = self.instance_variable_get(name)
      end
      values.deep_merge(locals)
      
      content=''
      if(not block.nil?)
        content = yield
      end
      locals['content']=content
      tem.do_layout(values, tem.class.layouts)
      tem.output
    end
  end
end