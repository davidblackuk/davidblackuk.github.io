#
# Extend Jekyll to generate a Ferret index of all the posts in this blog.
#
      
require 'ferret'
require 'hpricot'
require 'jekyll/filters'

include Ferret
include Jekyll::Filters

module Jekyll
  class Site
    # Process the posts on the site, adding each to the index
    def index_posts(index)
      self.posts.each do |post|
        post.index_post(index)
      end
    end
  end
  
  class Post
    def excerpt(words = 20, truncate_string = "...")
      data = self.to_liquid
      if excerpt = data['excerpt']
        excerpt
      else
      	doc = Hpricot.parse(self.content)
      	(doc/:"text()").to_s.split[0..words].join(' ') + truncate_string
    	end
    end

    # Add the post data to the index
    def index_post(index)
      if self.published
        data = self.to_liquid
        index << {:url => CGI.unescape(self.url),
                  :date => date_to_string(self.date),
                  :title => data['title'],
                  :tags => self.tags + self.categories,
                  :excerpt => self.excerpt,
                  :content => self.content
                 }
      end
    end
  end
  
  # Add the posts to the index
  AOP.after(Site, :write) do |site_instance, result, args|
    idx_path = site_instance.config['index_path'] || '_index'
    
    puts "Indexing site: #{site_instance.config['source']} -> #{idx_path}"
    
    fis = Index::FieldInfos.new(:store => :no)
    fis.add_field(:url, :store => :yes, :index => :yes)
    fis.add_field(:title, :store => :yes, :index => :yes, :boost => 10.0)
    fis.add_field(:tags, :store => :yes, :index => :yes, :boost => 10.0)
    fis.add_field(:excerpt, :store => :yes, :index => :yes, :boost => 5.0)
    fis.add_field(:date, :store => :yes, :index => :yes)
    fis.add_field(:content, :index => :yes)
    
    idx = Index::IndexWriter.new(:path=>idx_path, :field_infos => fis, :create => true, :key => :url)
    site_instance.index_posts(idx)
  end
end