defmodule Github do
	def get() do
		HTTPoison.get!( "https://api.github.com/repos/Elixir-lang/Elixir/issues" )
		|> body
		|> Poison.decode!
		|> Enum.map( fn( %{ "title" => title } ) -> title end )
	end
	def body( %{ status_code: 200, body: json_body } ), do: json_body
end
