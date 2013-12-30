module Jekyll
  module Undash
    def undash(content)
      content.gsub("-", " ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::Undash)
