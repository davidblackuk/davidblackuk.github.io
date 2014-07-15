require 'sinatra'
require 'sinatra/jekyll'
require 'ferret'
include Ferret

configure do
  set :views, File.dirname(__FILE__) + '/../../_layouts/'
  set :haml, {:format => :html5}
  set :site, YAML.load_file(File.join('.', '_config.yml'))
end

before do
  @site = options.site
  @idx = Index::Index.new(:path => File.dirname(__FILE__) + '/../../_index')
end

helpers do
  def fetch_document_fields(doc)
    { "url" => doc[:url], 
      "title" => doc[:title],
      "date" => doc[:date],
      "excerpt" => doc[:excerpt]
    }
  end
end

not_found do
  path = request.path_info
  path = path.gsub(/[^a-zA-Z0-9]/, " ").strip
  params['q'] = path
  
  @results = []
  @idx.search_each("#{path}", {:limit => 4}) do |id,score|
    post = fetch_document_fields(@idx[id])
    post["id"] = id
    post["score"] = score
    @results << post
  end
  
  jekyll :suggest
end