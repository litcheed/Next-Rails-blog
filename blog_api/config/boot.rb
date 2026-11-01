abort "This repository is archived and contains dependencies with known vulnerabilities. Do not install or run it. / このリポジトリはアーカイブです。依存に既知の脆弱性があるため、実行しないでください。"

ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.
require "bootsnap/setup" # Speed up boot time by caching expensive operations.
