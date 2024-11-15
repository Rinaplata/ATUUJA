import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext"; // Assuming this fetches user progress and data
import colors from "../constants/colors";

const EditProfileScreen = ({ navigation }) => {
  const { user: authUser } = useAuth();
  const { progress, fetchUserProgress, loading, error } = useProgress();

  const [editingField, setEditingField] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (authUser?.userId) {
      fetchUserData(authUser.userId);
    }
  }, [authUser]);

  const fetchUserData = async (userId) => {
    try {
      await fetchUserProgress(userId); // Reuse the same logic as `HomeScreen`
      setUserData({
        name: progress?.user?.Username || "",
        email: progress?.user?.Email || "",
      });
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      Alert.alert("Error", "No se pudo cargar la información del usuario.");
    }
  };

  const handleUpdate = async (field, value) => {
    try {
      const updatedData = { ...userData, [field]: value };
      // Assume there's an `updateUserProgress` in `ProgressContext` for this logic
      await updateUserProgress(authUser.userId, updatedData);
      setUserData(updatedData);
      setEditingField(null);
      Alert.alert("Éxito", "Información actualizada correctamente");
    } catch (err) {
      console.error("Error updating user:", err.message);
      Alert.alert("Error", "No se pudo actualizar la información.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.luminous} />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Ajustes</Text>
      <Text style={styles.sectionTitle}>Sobre tu cuenta</Text>

      {/* Name */}
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.label}>Nombre</Text>
          {editingField === "name" ? (
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, name: text }))
              }
              onSubmitEditing={() => handleUpdate("name", userData.name)}
              placeholder="Ingresa tu nombre"
            />
          ) : (
            <Text style={styles.infoText}>{userData.name}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            setEditingField(editingField === "name" ? null : "name")
          }
        >
          <Text style={styles.editText}>
            {editingField === "name" ? "Guardar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.label}>Correo electrónico</Text>
          {editingField === "email" ? (
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, email: text }))
              }
              onSubmitEditing={() => handleUpdate("email", userData.email)}
              placeholder="Ingresa tu correo"
            />
          ) : (
            <Text style={styles.infoText}>{userData.email}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            setEditingField(editingField === "email" ? null : "email")
          }
        >
          <Text style={styles.editText}>
            {editingField === "email" ? "Guardar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Change Password */}
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.label}>Nueva contraseña</Text>
          {editingField === "password" ? (
            <TextInput
              style={styles.input}
              value={userData.Password || ""} // Ensure it references Password
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, Password: text }))
              }
              secureTextEntry
              placeholder="Ingresa nueva contraseña"
              onSubmitEditing={() =>
                handleUpdate("Password", userData.Password)
              }
            />
          ) : (
            <Text style={styles.infoText}>{userData.Password}</Text> // Correct reference
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            setEditingField(editingField === "password" ? null : "password")
          }
        >
          <Text style={styles.editText}>
            {editingField === "password" ? "Guardar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "Login" }] })
        }
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.principal,
    padding: 20,
    justifyContent: "flex-start",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.principal,
  },
  loadingText: {
    color: "#FFF",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFF",
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B35A56",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    flexDirection: "column",
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#FFF",
  },
  infoText: {
    color: "#FFF",
    fontSize: 16,
    marginTop: 5,
  },
  input: {
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  editButton: {
    backgroundColor: "#E97C71",
    padding: 8,
    borderRadius: 5,
  },
  editText: {
    color: "#FFF",
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: "#A72C2A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default EditProfileScreen;
