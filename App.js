import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';

const cards = [
  // "🥹",
  // "🗣️",
  // "🦷",
  // "🍑",
  // "🌪️",
  // "🌎",
  "🐷",
  "🪝",
  "⚛️",
  "🔑",
  "🥕",
  "🥑",
  // "👻",
  // "🥶",
  // "🥵",
];

export default function App() {

  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
  const [selectedCard, setSelectedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);


  useEffect(() => {
    if (selectedCard.length < 2) return;

    if (board[selectedCard[0]] === board[selectedCard[1]]) {
      setMatchedCards([...matchedCards, ...selectedCard]);
      setSelectedCard([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCard([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCard])
  

  const handleTapCard = index => {
    if (selectedCard.length >= 2 || selectedCard.includes(index)) return;
    setSelectedCard([...selectedCard, index]);
    setScore(score + 1);
  };

  const UsuarioWiner = () => matchedCards.length === board.length;


  const resetGame = () => {

    setMatchedCards([]);
    setScore(0);
    setSelectedCard([]);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{UsuarioWiner() ? "Felicitaciones !!!" : "Juego de Memoria"}</Text>
      <Text style={styles.title}>Record: {score}</Text>
        <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver = 
          selectedCard.includes(index) || matchedCards.includes(index)
        return (
          <Card 
            key={index}
            isTurnedOver={isTurnedOver}
            onPress={() => handleTapCard(index)}
          >

            {card}

          </Card>
);


})}
        </View>
      {UsuarioWiner() && <Button title='Reset' onPress={resetGame} />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold'
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});



/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
 function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}