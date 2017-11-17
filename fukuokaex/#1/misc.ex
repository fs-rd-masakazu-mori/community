defmodule Misc do
	def sort( values ), do: Enum.sort( values )
	# Misc.sort [ 5, 1, 3 ]
	# Misc.sort %{ "key2" => "abc", "key1" => 123 }
	# Misc.sort %{ No: "no need", Yes: "need", NA: "N/A" }

	def match_sample( %{ k2: value } ), do: value
	# Misc.match_sample %{ k1: "v1", k2: "v2", k3: "v3" }

	def match( %{ Yes: "we can" } ), do: "Barack Obama"
	def match( %{ Yes: need } ), do: need
	# Misc.match %{ No: "-", Yes: "we can", NA: "N/A" }
	# Misc.match %{ No: "-", Yes: "we do", NA: "N/A" }

#	def match( _ ), do: "Yes...NOT EXIST"

	def match_inner( input_map ) do
		%{ Yes: need } = input_map
		need
	end
end
