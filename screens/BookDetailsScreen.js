import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const BookDetailsScreen = ({ navigation }) => {
  const [item, setItem] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item.length < 3) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(item)}`);
        const data = await response.json();
        const bookResults = data.docs
          .filter(book => book.key?.startsWith('/works/')) // Varmistetaan että se on "work"-alkuinen
          .map(book => ({
            key: book.key, // esim. "/works/OL12345W"
            title: book.title,
            author: book.author_name?.[0] || 'Unknown author',
          }));
        setBooks(bookResults);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [item]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search a book"
        onChangeText={text => setItem(text)}
        value={item}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {!loading && item.length >= 3 && books.length === 0 && (
        <Text style={styles.noResults}>No books matching search: "{item}"</Text>
      )}

      <FlatList
        data={books}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('BookInfo', { bookKey: item.key })} // ✅ Lähetetään bookKey esim. "/works/OL12345W"
          >
            <Text>{item.title} — {item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  noResults: {
    color: 'red',
    marginBottom: 20,
  },
  bookItem: {
    marginBottom: 10,
  },
});

export default BookDetailsScreen;
