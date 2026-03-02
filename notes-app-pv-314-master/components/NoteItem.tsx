import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useState } from "react";

type NoteItemProps = {
  title: string;
  date: number;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
};

export function NoteItem({ title, date, onDelete, onEdit }: NoteItemProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    if (!editedTitle.trim()) return;

    onEdit(editedTitle);
    setIsEditing(false);
  };

  return (
    <View style={styles.note}>
      {isEditing ? (
        <>
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
            style={styles.input}
            onSubmitEditing={handleSave}
            onBlur={handleSave}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.text}>{title}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 12 }}>
              {new Date(date).toLocaleString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    note: {
      padding: 16,
      backgroundColor: colors.surface,
      marginBottom: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      color: colors.text,
    },
    input: {
      flex: 1,
      color: colors.text,
      borderBottomWidth: 1,
      borderColor: colors.primary,
      marginRight: 10,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
    },
    saveText: {
      color: colors.surface,
      fontWeight: "bold",
    },
    deleteButton: {
      marginLeft: 10,
      backgroundColor: colors.danger,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
    },
    deleteText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });