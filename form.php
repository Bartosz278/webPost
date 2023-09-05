<h1>Form connection test </h1>

<div id="FormTest">
    <form method="post">
        <input type="text" name="imie" value=""><br>
        <input type="text" name="nazwisko" value=""><br>
        <input type="number" name="wiek" value="">
        <input type="submit">
    </form>
</div>
<?php 
    function OpenCon()
     {
     $dbhost = "localhost";
     $dbuser = "root";
     $dbpass = "";
     $db = "test";


     $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);


     return $conn;
     }

    function CloseCon($conn)
     {
     $conn -> close();
     }

    $conn = OpenCon();
    echo "Connected Successfully <br>";
//    CloseCon($conn);
    
    $a = $_POST['imie'];
    $b = $_POST['nazwisko'];
    $c = $_POST['wiek'];
    if(!empty($a)and!empty($b)and!empty($c)){
    $sql = "INSERT INTO test(imie,nazwisko,lat) VALUES('$a', '$b','$c')";
    }
    $query = mysqli_query($conn,$sql);
    if($query){
        echo "git";
    }
    else{
        echo "no";
    }
    ?>
