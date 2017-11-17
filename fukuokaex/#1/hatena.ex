defmodule Hatena do
	def get() do
		HTTPoison.get!( "http://b.hatena.ne.jp/entrylist/json?sort=count&url=Elixir" )
		|> body
		|> String.slice( 1..-3 )    # そのままだとinvalidなJSONなので加工
		|> Poison.decode!
		|> Enum.map( fn( %{ "title" => title } ) -> title end )
	end
	def body( %{ status_code: 200, body: json_body } ), do: json_body
end
