module Jekyll
  module Capitalize
    def capitalize(content)
      content.split.map(&:capitalize)*' '
    end
  end
end

Liquid::Template.register_filter(Jekyll::Capitalize)
