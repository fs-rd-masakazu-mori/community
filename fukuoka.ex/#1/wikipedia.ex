defmodule Wikipedia do
	def get() do
		HTTPoison.get!( "https://ja.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=Elixir"
		|> body
		|> Poison.decode!
		|> dig
		|> Enum.map( fn( %{ "title" => title } ) -> title end )
	end
	def body( %{ status_code: 200, body: json_body } ), do: json_body
	def dig( %{ "query" => %{ "search" => search } } ), do: search
end
