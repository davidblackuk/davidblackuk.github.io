require 'grit'
require 'liquid'

module PC
    class History < Liquid::Tag
        def initialize(tag_name, markup, tokens)
            super
        end

        def render(context)
            f = File::Stat.new context['site']['source']
            return f.mtime.to_i.to_s
        end
    end
end

Liquid::Template.register_tag('history', PC::History)
