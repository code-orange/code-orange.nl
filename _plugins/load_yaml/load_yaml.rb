module Jekyll
  class YAMLoader < Generator
    priority :highest
	safe true

	def generate(site)
		content = {}
		content['team'] = YAML::load(File.read('_source-assets/content/team.yml'))
		
		site.config['content'] = content
	end
  end
end
