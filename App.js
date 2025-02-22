import React, { useEffect, useState } from "react";
import * as Sqlite from "expo-sqlite";
import { initialDB } from "./tools/initialDB";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function RegistrationForm() {
  return (
    <Sqlite.SQLiteProvider databaseName="jc.db" onInit={initialDB}>
      <View style={styles.container}>
        <SignUp />
      </View>
    </Sqlite.SQLiteProvider>
  );
}
// Sign Up Component.
function SignUp() {
  const db = Sqlite.useSQLiteContext();
  
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // loading state.
  if (isLoading) {
    return (
      <View>
        <Text>Loading from DB...</Text>
      </View>
    );
  }
  // insert an user on DB ---ok---.
  async function newUsers() {
    try {
      const nuId = () => uuidv4();
      setId(nuId);
      console.log("Data to Insert: ", [id, name, phone]);

      const query = await db.runAsync(
        `
        INSERT INTO jusers(juid,username,phone) VALUES(?,?,?)`,
        [id, name, phone]
      );
      loadUsers();
      showUsers();
    } catch (e) {
      console.log("Error on Insert DB. ", e);
    }
  }
  // upd an user on DB.
  async function updUsers() {
    try {
      const query = await db.runAsync(
        `UPDATE jusers SET username = ? WHERE username = ?`,
        [name, phone]
      );
      loadUsers();
      showUsers();
    } catch (e) {
      console.log("Error on Insert DB. ", e);
    }
  }
  // del an user on DB --- ok ---.
  async function delUsers() {
    try {
      const query = await db.runAsync(`DELETE FROM jusers WHERE username = $un`, 
        {$un:name});
      loadUsers();
      showUsers();
    } catch (e) {
      console.log("Error on Insert DB. ", e);
    }
  }
  // load data from DB.
  async function loadUsers() {
    try {
      setIsLoading(true);
      const query = await db.getAllSync(`SELECT * FROM jusers;`);
      console.log("Users Loaded: ", query);
      console.log("Count Users: ", query.length);
      setUsers(query);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  //
  function showUsers() {
    try {
      return users.map((user, index) => {
        return (
          <View>
            <Text>
              {user.username} - {user.phone}
            </Text>
          </View>
        );
      });
    } catch (e) {
      console.log(e);
    }
  }
  //
  useEffect(() => {
    loadUsers();
    showUsers();
  }, []);
  //
  return (
    <View style={styles.container}>
      <Text style={{ height: 40 }}>
        {name}-{phone}
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 150,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#555",
          bottom: 10,
        }}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{
          height: 40,
          width: 150,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#555",
          bottom: 5,
        }}
        onChangeText={(text) => setPhone(text)}
      />
      <Button
        style={styles.button}
        title="!insert me."
        onPress={() => {
          newUsers();
        }}
      />
      <Button
        style={styles.button}
        title="!upd me."
        onPress={() => {
          updUsers();
        }}
      />
      <Button
        style={styles.button}
        title="!del me."
        onPress={() => {
          delUsers();
        }}
      />
      {showUsers()}
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
