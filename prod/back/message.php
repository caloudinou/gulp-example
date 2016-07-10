<?php

header("Content-Type: application/json");


$idEditor = (isset($_POST["IdEditor"])) ? htmlentities($_POST["IdEditor"]) : NULL;

if ($idEditor) {
	mysql_connect($hote, $login, $m_d_p);
	mysql_select_db($bdd);


	$query = mysql_query("SELECT * FROM ajax_example_softwares WHERE idEditor=" . mysql_real_escape_string($idEditor) . " ORDER BY name");
	while ($back = mysql_fetch_assoc($query)) {
		echo "<item id=\"" . $back["id"] . "\" name=\"" . $back["name"] . "\" />";
	}
}

echo "</list>";

?>