require 'rubygems'
require 'nokogiri'
require 'open-uri'

#imgur

#for(var i=0;i<$(".zoom").length;i++) { console.log($($(".description")[i]).html() + "\n ![" + (i + 1) + "](" + $($(".zoom")[i]).attr('href') + ")\n"); }

#simply recipes

doc = Nokogiri::HTML(open(ARGV[0]))

puts doc.search('title').content
puts doc.css('.featured-image img')

ingredients = doc.css('#recipe-ingredients li').map { |e| e.content }
directions = doc.css('#recipe-method p').map { |e| e.content }[0..-2].map { |e| e[2..-1] }

puts '### Ingredients'
ingredients.each do |ingredient|
  puts  "* #{ingredient}"
end
puts ""
puts "### Directions"
directions.each do |direction|
  puts "* #{direction}"
end
