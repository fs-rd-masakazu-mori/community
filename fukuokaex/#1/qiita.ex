defmodule Crawl do
	def get() do
		HTTPoison.get!( "https://qiita.com/api/v2/items?query=Elixir" )
		|> body
		|> Poison.decode!
		|> Enum.map( fn( %{ "title" => title } ) -> title end )
	end
	def body( %{ status_code: 200, body: json_body } ), do: json_body
end
