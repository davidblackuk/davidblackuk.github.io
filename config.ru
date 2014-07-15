$:.unshift File.join(File.dirname(__FILE__), '_lib')

require 'sinatra'
require 'search/app'

run Sinatra::Application