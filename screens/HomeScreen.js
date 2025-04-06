import React, { useState } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';

const BookSearchScreen = () => {
  const [item, setItem] = useState('');  // Alustetaan item-tila

  // Esimerkki hakukirjaston (mock) tiedoista. Tähän sitten api kutsu!!
  const books = [
    { id: '1', title: 'The Lord of the Rings' },
    { id: '2', title: 'Harry Potter and the Sorcerer\'s Stone' },
    { id: '3', title: 'The Hobbit' },
    { id: '4', title: 'A Game of Thrones' },
  ];

  // Suodatetaan kirjat hakutekstin perusteella
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(item.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
     
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
        }}
        placeholder="Search for a book"
        onChangeText={text => setItem(text)}  // Päivittää hakutekstin tilan
        value={item}  // Asetetaan hakuteksti kenttään
      />
       {/* Mikäli haluttua kirjaa ei löydy */}
      {filteredBooks.length === 0 && item.length > 0 && (
        <Text style={{ color: 'red', marginBottom: 20}}>No books matching "{item}"</Text>
      )}

      {/* Lista suodatetuista kirjoista */}
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default BookSearchScreen;
