require 'json'

module Jekyll
	module JSONFilter
		def yaml_to_json(input)
			input.to_json
		end
	end
end

Liquid::Template.register_filter(Jekyll::JSONFilter)
