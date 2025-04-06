// screens/BookDetailsScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const BookDetailsScreen = ({ route }) => {
  const { bookId } = route.params;
  // Tähän sit api kutsu!!
  const bookDetails = {
    id: bookId,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel about a hobbit named Bilbo Baggins.',
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{bookDetails.title}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>By {bookDetails.author}</Text>
      <Text>{bookDetails.description}</Text>
    </View>
  );
};

export default BookDetailsScreen;
