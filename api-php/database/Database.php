<?php
/**
 * Database Helper Class
 * Simple wrapper for MySQL database operations
 */

class Database {
    private $conn;
    private static $instance = null;

    private function __construct() {
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if ($this->conn->connect_error) {
            logMessage("Database connection failed: " . $this->conn->connect_error, 'ERROR');
            throw new Exception('Database connection failed');
        }

        $this->conn->set_charset('utf8mb4');
    }

    /**
     * Get singleton instance
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    /**
     * Get the raw mysqli connection
     */
    public function getConnection() {
        return $this->conn;
    }

    /**
     * Execute a query and return the result
     */
    public function query($sql) {
        $result = $this->conn->query($sql);

        if ($result === false) {
            logMessage("Query failed: " . $this->conn->error . " | SQL: " . $sql, 'ERROR');
            throw new Exception('Database query failed');
        }

        return $result;
    }

    /**
     * Prepare a statement
     */
    public function prepare($sql) {
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            logMessage("Prepare failed: " . $this->conn->error . " | SQL: " . $sql, 'ERROR');
            throw new Exception('Database prepare failed');
        }

        return $stmt;
    }

    /**
     * Get last inserted ID
     */
    public function getLastInsertId() {
        return $this->conn->insert_id;
    }

    /**
     * Escape string for safe SQL usage
     */
    public function escape($value) {
        return $this->conn->real_escape_string($value);
    }

    /**
     * Begin transaction
     */
    public function beginTransaction() {
        $this->conn->begin_transaction();
    }

    /**
     * Commit transaction
     */
    public function commit() {
        $this->conn->commit();
    }

    /**
     * Rollback transaction
     */
    public function rollback() {
        $this->conn->rollback();
    }

    /**
     * Close connection
     */
    public function close() {
        if ($this->conn) {
            $this->conn->close();
        }
    }

    /**
     * Prevent cloning
     */
    private function __clone() {}
}

/**
 * Helper function to get database instance
 */
function getDB() {
    return Database::getInstance();
}
