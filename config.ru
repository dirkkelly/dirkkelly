if ENV['RACK_ENV'] == 'production'
  require 'rack/ssl-enforcer'
  use Rack::SslEnforcer, only_hosts: 'dirkkelly.com'
end

require 'middleman-core/load_paths'
::Middleman.setup_load_paths

require 'middleman-core'
require 'middleman-core/rack'

require 'fileutils'
FileUtils.mkdir('log') unless File.exist?('log')
::Middleman::Logger.singleton("log/#{ENV['RACK_ENV']}.log")

app = ::Middleman::Application.new

run ::Middleman::Rack.new(app).to_app
