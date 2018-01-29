defmodule ElixirEnum do
	def run( filename ) do
		start = Timex.now

		result = 
			filename
			|> File.stream!

			# データクレンジング
			|> Enum.map( &( String.replace( &1, ",",    "\t" ) ) )			# ①CSV→TSV
			|> Enum.map( &( String.replace( &1, "\r\n", "\n" ) ) )			# ②CRLF→LF
			|> Enum.map( &( String.replace( &1, "\"",   ""   ) ) )			# ③ダブルクォート外し

			# 集計
			|> Enum.map( &( &1 |> String.split( "\t" ) ) )					# ④タブで分割
			|> Enum.map( &Enum.at( &1, 2 - 1 ) )							# ⑤2番目の項目を抽出

			|> Enum.reduce( 
				%{}, fn( name, acc ) 					# ⑥同値の出現数を集計
				-> Map.update( acc, name, 1, &( &1 + 1 ) ) end )
			|> Enum.sort( &( elem( &1, 1 ) > elem( &2, 1 ) ) )				# ⑦多い順でソート

#		IO.inspect( result )

		finish = Timex.now
		IO.puts( start )
		IO.puts( finish )
		minutes = Timex.diff( finish, start, :minutes )
		seconds = Timex.diff( finish, start, :seconds )           - minutes * 60
		millis = Timex.diff( finish, start, :milliseconds ) - minutes * 60 * 1000        - seconds * 1000
		millis_pad = millis |> Integer.to_string |> String.pad_leading( 3, "0" )
		IO.puts( "#{ minutes }m#{ seconds }.#{ millis_pad }s" )
	end
end
