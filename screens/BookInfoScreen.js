import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const BookInfoScreen = ({ route }) => {
  const { bookKey } = route.params;  // Esimerkiksi "/works/OL20895240W"
  const [bookDetails, setBookDetails] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log('bookKey:', bookKey);

        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBookDetails(data);

        // Tämä hakee myös kirjoittajan nimen erillisestä API-kutsusta
        if (data?.authors?.length > 0) {
          const authorKey = data.authors[0].author.key; 
          const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
          if (authorRes.ok) {
            const authorData = await authorRes.json();
            setAuthorName(authorData.name);
          }
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchBookDetails();
  }, [bookKey]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{`Error: ${error}`}</Text>;
  }

  if (!bookDetails) {
    return <Text>No book details available</Text>;
  }

  const descriptionText =
    typeof bookDetails.description === 'string'
      ? bookDetails.description
      : bookDetails.description?.value || 'No description available';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bookDetails.title}</Text>
      <Text style={styles.author}>{authorName || 'Unknown author'}</Text>
      <Text>{descriptionText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BookInfoScreen;
