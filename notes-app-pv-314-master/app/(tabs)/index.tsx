import { NoteItem } from "@/components/NoteItem";
import { Title } from "@/components/Title";
import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState<string>("");
  const [sortType, setSortType] = useState<"date" | "alphabet">("date");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    loadNotes();    
  }, []); 

  const addNote = async () => {
    if (!text.trim()) return;

    const newNote = {
      userId: 1,
      id: Date.now(),
      title: text,
      completed: false,
      createdAt: Date.now(),
    };

    try {
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      setText("");
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id: number) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
          } catch (error) {
            console.error("Error deleting note:", error);
          }
        },
      },
    ]);
  };

  const editNote = async (id: number, newTitle: string) => {
    try {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      );
      setNotes(updatedNotes);
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const sortedNotes = () => {
    const sorted = [...notes]
    if (sortType === "alphabet") {
      if (isAscending) {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
      }
    } else {
      if (isAscending) {
        sorted.sort((a, b) => a.createdAt - b.createdAt);
      } else {
        sorted.sort((a, b) => b.createdAt - a.createdAt);
      }
    }
    return sorted;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.container}>
        {/* {notes.map((note) => (
          <NoteItem key={note.id} title={note.title} />
        ))} */}

        <Title text="My Notes" />

        <TextInput
          placeholder="Add a new note"
          placeholderTextColor={colors.textMuted}
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => {
            if (sortType === "date") {
              setSortType("alphabet");
            } else {
              setSortType("date");
            }
          } } style={styles.sortButton}>
            <Text style={styles.buttonTextSort}>
              Sort by: {sortType === "date" ? "Date" : "Alphabet"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsAscending(!isAscending)} style={styles.sortButton}>
            <Text style={styles.buttonTextSort}>
              {isAscending ? "↑" : "↓"}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedNotes()}
          keyExtractor={(note) => note.id.toString()}
          renderItem={({ item }) => (
            <NoteItem title={item.title} date={item.createdAt} onDelete={() => deleteNote(item.id)} onEdit={(newTitle) => editNote(item.id, newTitle)} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.bg,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
      color: colors.text,
      
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
    },
    buttonText: {
      color: colors.surface,
      textAlign: "center",
      fontWeight: "bold",
    },
    note: {
      padding: 10,
      backgroundColor: colors.surface,
      color: colors.text,
      marginBottom: 6,
      borderRadius: 6,
    },
    sortButton: {
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonTextSort: {
      color: colors.primary,
      fontWeight: "600",
    },
  });
