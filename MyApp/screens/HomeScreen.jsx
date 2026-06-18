import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Mock Data ───────────────────────────────────────────────────────────────

const ROUTES = [
  {
    id: '1',
    eta: '19mins',
    distance: '1.0km',
    origin: 'Car pack B, opposite prayer foyer Back of old auditorium...',
    destination: 'Car pack C gate, to lagos Ibadan expressway',
  },
  {
    id: '2',
    eta: '17mins',
    distance: '1.3km',
    origin: 'Car pack B, opposite prayer foyer Back of old auditorium...',
    destination: 'Lotto, to lagos Ibadan through Tree of life, Missionary host...',
  },
  {
    id: '3',
    eta: '25mins',
    distance: '1.6km',
    origin: 'Car pack C, Lagos Ibadan expressway',
    destination: 'New auditorium shimawa through Car B tree of life gate...',
  },
  {
    id: '4',
    eta: '25mins',
    distance: '1.6km',
    origin: 'Car pack F, serving point Moses apart road',
    destination: 'New auditorium shimawa through car p...',
  },
];

const EVENT_BANNERS = [
  {
    id: '1',
    image: require('../assets/mega_festival.png'),
    title: 'Mega Festival',
  },
  {
    id: '2',
    image: require('../assets/divine_faithfulness.png'),
    title: 'Divine Faithfulness',
  },
  {
    id: '3',
    image: require('../assets/Holy_Ghost.png'),
    title: 'Holy Ghost',
  },
];

const TABS = [
  { name: 'Home',    screen: 'Home',      icon: 'home-outline',          activeIcon: 'home' },
  { name: 'Routing', screen:'RouteMap',   icon: 'git-branch-outline',    activeIcon: 'git-branch' },
  { name: 'Napep',   screen:'NearestNapep',icon: 'car-sport-outline',     activeIcon: 'car-sport' },
  { name: 'Account', screen:'MyProfile',   icon: 'person-circle-outline', activeIcon: 'person-circle' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

/**
 * Aerial/satellite map strip at the top.
 * Swap `source` for a real MapView or Google Maps Static tile in production.
 */
const MapHeader = () => (
  <ImageBackground
    source={require('../assets/map_aerial.png')}
    style={styles.mapHeader}
    resizeMode="cover"
  >
    <SafeAreaView edges={['top']} style={styles.mapHeaderSafe} />
  </ImageBackground>
);

/** Single route card */
const RouteCard = ({ route }) => (
  <TouchableOpacity activeOpacity={0.75} style={styles.routeCard}>
    {/* Top row: ETA left | car icon + distance right */}
    <View style={styles.routeCardTop}>
      <Text style={styles.etaText}>
        <Text style={styles.etaLabel}>ETA </Text>
        {route.eta}
      </Text>
      <View style={styles.routeCardTopRight}>
        <FontAwesome5 name="car-side" size={20} color="#555" style={{ marginRight: 6 }} />
        <Text style={styles.distanceText}>{route.distance}</Text>
      </View>
    </View>

    {/* Hairline divider */}
    <View style={styles.routeCardDivider} />

    {/* Origin — red pin */}
    <View style={styles.routeStop}>
      <Ionicons name="location-sharp" size={14} color="#E53935" style={styles.stopIcon} />
      <Text style={styles.stopText} numberOfLines={1}>
        {route.origin}
      </Text>
    </View>

    {/* Destination — green pin */}
    <View style={styles.routeStop}>
      <Ionicons name="location-sharp" size={14} color="#43A047" style={styles.stopIcon} />
      <Text style={styles.stopText} numberOfLines={1}>
        {route.destination}
      </Text>
    </View>
  </TouchableOpacity>
);

/** "Take a look" horizontal event banner strip */
const EventBannerStrip = () => (
  <View style={styles.takeLookSection}>
    <Text style={styles.takeLookTitle}>TAKE A LOOK</Text>
    <FlatList
      data={EVENT_BANNERS}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bannerList}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.bannerCard}>
          <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
        </TouchableOpacity>
      )}
    />
  </View>
);

/** Bottom tab bar */
const BottomTabBar = ({ activeTab, onPress, navigation }) => (
  <View style={styles.tabBar}>
    {TABS.map((tab) => {
      const isActive = tab.name === activeTab;
      return (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => {
            onPress(tab.name);
            navigation.navigate(tab.screen);
          }}
        >
          <Ionicons
            name={isActive ? tab.activeIcon : tab.icon}
            size={22}
            color={isActive ? DARK_RED : '#888'}
          />
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const filteredRoutes = ROUTES.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.origin.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q)
    );
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Aerial map header strip */}
      <MapHeader />

      {/* Body */}
      <View style={styles.body}>
        {/* Search bar */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={16} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Route ?"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredRoutes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}

          <EventBannerStrip />

          {/* Extra breathing room above tab bar */}
          <View style={{ height: 16 }} />
        </ScrollView>
      </View>

      <BottomTabBar activeTab={activeTab} onPress={setActiveTab} navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────

const DARK_RED = '#8B1A1A';
const CARD_RADIUS = 10;
const CARD_SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  android: { elevation: 2 },
});

const styles = StyleSheet.create({
  // ── Root ──
  root: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  // ── Map header ──
  mapHeader: {
    width: '100%',
    height: 120,
  },
  mapHeaderSafe: {
    flex: 1,
  },

  // ── Body ──
  body: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  // ── Search bar ──
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    ...CARD_SHADOW,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
    margin: 0,
  },

  // ── Scroll content ──
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },

  // ── Route card ──
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    ...CARD_SHADOW,
  },
  routeCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeCardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },
  etaLabel: {
    fontWeight: '400',
    color: '#555',
  },
  distanceText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  routeCardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  routeStop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  stopIcon: {
    marginTop: 1,
    marginRight: 6,
  },
  stopText: {
    flex: 1,
    fontSize: 12,
    color: '#444',
    lineHeight: 17,
  },

  // ── Take a look ──
  takeLookSection: {
    marginTop: 6,
    marginBottom: 4,
  },
  takeLookTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#222',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  bannerList: {
    paddingRight: 4,
  },
  bannerCard: {
    width: (SCREEN_WIDTH - 14 * 2 - 10 * 2) / 3,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  // ── Bottom tab bar ──
  tabBar: {
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#D9D9D9',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 8 },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  tabLabelActive: {
    color: DARK_RED,
    fontWeight: '600',
  },
});