<?php

require_once 'config.php';

class Database {

    public $db = "";

    public function __construct() {
        $this->db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    }

    /**
     * Inserting into database
     */
    public function insert($tableName, $values) {
        $column = implode(",", array_keys($values));
        $value = "'" . implode("','", array_values($values)) . "'";
        $sql = "INSERT INTO $tableName ($column) VALUES ($value)";
        $result = mysqli_query($this->db, $sql);
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check the count 
     */
    public function count($tableName, $selCols, $where) {
        $sql = "SELECT $selCols FROM $tableName WHERE $where";
        $result = mysqli_query($this->db, $sql);
        $exist = mysqli_affected_rows($this->db);
        return $exist;
    }

    /**
     * Select to display
     */
    public function select($tableName) {
        $sql = "SELECT * FROM $tableName";
        $result = mysqli_query($this->db, $sql);
        while ($row = mysqli_fetch_object($result)) {
            $returnArray[] = $row;
        }
        return $returnArray;
    }

    /**
     * Update into database
     */
    public function update($tableName, array $set_val_cols, $where) {
        foreach ($set_val_cols as $key => $value) {
            $set[] = $key . " = '" . $value . "'";
        }
        $Stset = implode(", ", $set);
        $sql = "UPDATE $tableName SET $Stset WHERE $where";
        $result = mysqli_query($this->db, $sql);
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete from database
     */
    public function delete($tableName, $where) {
        $sql = "DELETE FROM $tableName WHERE $where";
        $result = mysqli_query($this->db, $sql);
        return $result;
    }

    /**
     * Delete from database
     */
    public function myQurey($sql) {
        $result = mysqli_query($this->db, $sql);
        while ($row = mysqli_fetch_object($result)) {
            $returnArray[] = $row;
        }
        return $returnArray;
    }

}

?>