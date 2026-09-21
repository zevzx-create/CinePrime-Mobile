import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  SafeAreaView, 
  Dimensions,
  Alert 
} from 'react-native';
import { 
  Film, 
  Ticket, 
  ChevronLeft, 
  Armchair, 
  Star, 
  Calendar, 
  Clock 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');


const MOVIES = [
  { 
    id: '1', 
    title: 'Avatar: O Caminho da Água', 
    genre: 'Sci-Fi', 
    rating: '4.8', 
    price: '35.00', 
    image: 'https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    desc: 'Um épico visual que explora os oceanos de Pandora e a luta contra a colonização humana.'
  },
  { 
    id: '2', 
    title: 'Oppenheimer', 
    genre: 'Drama', 
    rating: '4.9', 
    price: '30.00', 
    image: 'https://images.pexels.com/photos/28227728/pexels-photo-28227728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    desc: 'A história do físico J. Robert Oppenheimer e a criação da bomba atômica.'
  },
  { 
    id: '3', 
    title: 'Duna: Parte Dois', 
    genre: 'Aventura', 
    rating: '4.7', 
    price: '32.00', 
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    desc: 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores.'
  },
];

export default function App() {
  const [screen, setScreen] = useState('home'); 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  

  const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Cine<Text style={{color: '#e11d48'}}>Prime</Text></Text>
        <TouchableOpacity style={styles.profileBtn}>
          <Film color="white" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Em Cartaz 🍿</Text>
        
        {MOVIES.map(movie => (
          <TouchableOpacity 
            key={movie.id} 
            style={styles.movieCard} 
            onPress={() => { setSelectedMovie(movie); setScreen('details'); }}
          >
            <Image source={{ uri: movie.image }} style={styles.movieImage} />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.movieMeta}>
                <Text style={styles.movieGenre}>{movie.genre}</Text>
                <View style={styles.ratingBox}>
                  <Star color="#fbbf24" size={14} fill="#fbbf24" />
                  <Text style={styles.ratingText}>{movie.rating}</Text>
                </View>
              </View>
              <Text style={styles.moviePrice}>R$ {movie.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  const DetailsScreen = () => (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setScreen('home')}>
        <ChevronLeft color="white" size={28} />
      </TouchableOpacity>

      <ScrollView>
        <Image source={{ uri: selectedMovie.image }} style={styles.detailImage} />
        
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>{selectedMovie.title}</Text>
          
          <View style={styles.detailMeta}>
            <View style={styles.metaItem}><Calendar color="#94a3b8" size={18} /><Text style={styles.metaText}>Out 15, 2026</Text></View>
            <View style={styles.metaItem}><Clock color="#94a3b8" size={18} /><Text style={styles.metaText}>19:30</Text></View>
            <View style={styles.metaItem}><Star color="#fbbf24" size={18} fill="#fbbf24" /><Text style={styles.metaText}>{selectedMovie.rating}</Text></View>
          </View>

          <Text style={styles.detailDesc}>{selectedMovie.desc}</Text>

          <TouchableOpacity 
            style={styles.buyBtn} 
            onPress={() => setScreen('seats')}
          >
            <Ticket color="white" size={20} />
            <Text style={styles.buyBtnText}>Escolher Assentos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const SeatsScreen = () => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    const toggleSeat = (seat) => {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setScreen('details')}>
          <ChevronLeft color="white" size={28} />
        </TouchableOpacity>

        <View style={styles.screenArea}>
          <Text style={styles.screenText}>TELA DO CINEMA</Text>
        </View>

        <View style={styles.seatsGrid}>
          {rows.map(row => (
            <View key={row} style={styles.seatRow}>
              {cols.map(col => {
                const seatId = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <TouchableOpacity 
                    key={seatId} 
                    style={[styles.seat, isSelected && styles.seatSelected]} 
                    onPress={() => toggleSeat(seatId)}
                  >
                    <Armchair color={isSelected ? "white" : "#475569"} size={20} />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Assentos: <Text style={{color: 'white', fontWeight: 'bold'}}>{selectedSeats.join(', ') || 'Nenhum'}</Text>
          </Text>
          <TouchableOpacity 
            style={[styles.confirmBtn, selectedSeats.length === 0 && {backgroundColor: '#334155'}]} 
            onPress={() => {
              Alert.alert("Sucesso!", `Ingressos para ${selectedSeats.length} assentos reservados para ${selectedMovie.title}!`);
              setScreen('home');
              setSelectedSeats([]);
            }}
          >
            <Text style={styles.confirmBtnText}>Confirmar Compra</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

    return screen === 'home' ? <HomeScreen /> : screen === 'details' ? <DetailsScreen /> : <SeatsScreen />;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  logoText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  profileBtn: { backgroundColor: '#1e293b', p: 10, borderRadius: 50, padding: 10 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: 'white', marginLeft: 20, marginBottom: 20 },
  movieCard: { backgroundColor: '#1e293b', marginHorizontal: 20, marginBottom: 20, borderRadius: 16, overflow: 'hidden', elevation: 5 },
  movieImage: { width: '100%', height: 200 },
  movieInfo: { padding: 15 },
  movieTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  movieMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  movieGenre: { color: '#94a3b8', fontSize: 14 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  moviePrice: { color: '#e11d48', fontWeight: 'bold', fontSize: 16 },
  
  backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 },
  detailImage: { width: '100%', height: 400 },
  detailContent: { padding: 20, backgroundColor: '#0f172a', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
  detailTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  detailMeta: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { color: '#94a3b8', fontSize: 14 },
  detailDesc: { color: '#94a3b8', fontSize: 16, lineHeight: 24, marginBottom: 30 },
  buyBtn: { backgroundColor: '#e11d48', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 18, borderRadius: 12 },
  buyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },

  screenArea: { width: '80%', height: 10, backgroundColor: '#475569', alignSelf: 'center', marginTop: 60, borderRadius: 5, shadowColor: '#fff', shadowOpacity: 0.5, shadowRadius: 10, elevation: 10 },
  screenText: { color: '#94a3b8', textAlign: 'center', fontSize: 12, marginTop: 10, fontWeight: 'bold' },
  seatsGrid: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  seatRow: { flexDirection: 'row', marginBottom: 10 },
  seat: { padding: 8, margin: 4, borderRadius: 8, backgroundColor: '#1e293b' },
  seatSelected: { backgroundColor: '#e11d48' },
  footer: { padding: 30, backgroundColor: '#1e293b', borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  footerText: { color: '#94a3b8', marginBottom: 15, fontSize: 16 },
  confirmBtn: { backgroundColor: '#e11d48', width: '100%', padding: 18, borderRadius: 12, alignItems: 'center' },
  confirmBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});