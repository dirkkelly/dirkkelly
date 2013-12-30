module Jekyll
  module ArrayToUrl
    def array_to_url(array)
      array.map { |el| "/#{el}"}
    end
  end
end

Liquid::Template.register_filter(Jekyll::ArrayToUrl)
