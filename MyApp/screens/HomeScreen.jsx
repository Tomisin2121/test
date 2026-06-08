// screens/HomeScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Modal, Animated,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';
import MapView, { Marker } from 'react-native-maps';

const ROUTES = [
  { id: '1', from: 'Car pack B', to: 'Car Pack C Gate', eta: '11mins', color: Colors.primary },
  { id: '2', from: 'Car pack B', to: 'River Jordan',    eta: '17mins', color: Colors.secondary },
];

const EVENTS = [
  { id: '1', title: 'METO',                subtitle: 'holy ghost convention',    date: 'Jun 2025' },
  { id: '2', title: 'Divine\nFaithfulness', subtitle: 'Theme: Divine Faithfulness', date: 'Jun 2025' },
  { id: '3', title: 'HOT\nCHOS\nFESTIVAL', subtitle: 'Lagos ghost festival',      date: 'Jun 2025' },
];

export default function HomeScreen({ navigation }) {
  const [search,      setSearch]      = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={s.container}>

      {/* ── Top Header Bar ── */}
      <View style={s.header}>
        {/* Hamburger */}
        <TouchableOpacity
          style={s.hamburger}
          onPress={() => setMenuVisible(true)}
        >
          <View style={s.bar} />
          <View style={s.bar} />
          <View style={s.bar} />
        </TouchableOpacity>

        <Text style={s.headerTitle}>City Transit</Text>

        {/* Logout */}
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={s.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* ── Hamburger Menu Modal ── */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        {/* Backdrop — tap to close */}
        <TouchableOpacity style={s.backdrop} onPress={closeMenu} activeOpacity={1}>

          {/* Nav Drawer — stops tap from closing */}
          <TouchableOpacity style={s.drawer} activeOpacity={1}>
            <Text style={s.drawerTitle}>Menu</Text>

            {/* Nav Items — horizontal row */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={s.navRow}>

                <TouchableOpacity
                  style={s.navItem}
                  onPress={() => { closeMenu(); }}
                >
                  <Text style={s.navLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.navItem}
                  onPress={() => { closeMenu(); navigation.navigate('RouteMap'); }}
                >
                 
                  <Text style={s.navLabel}>Routing</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.navItem}
                  onPress={() => { closeMenu(); navigation.navigate('NearestNapep'); }}
                >
                 
                  <Text style={s.navLabel}>Napep</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.navItem}
                  onPress={() => { closeMenu(); navigation.navigate('Login'); }}
                >
                
                  <Text style={s.navLabel}>Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[s.navItem, s.navItemLogout]}
                  onPress={() => { closeMenu(); navigation.navigate('Landing'); }}
                >
                 
                  <Text style={[s.navLabel, { color: Colors.secondary }]}>Log out</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </TouchableOpacity>

        </TouchableOpacity>
      </Modal>

      {/* ── Main Content ── */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Search */}
        <View style={s.searchRow}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Route ?"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Route Cards */}
        {ROUTES.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={[s.routeCard, { backgroundColor: route.color }]}
            onPress={() => navigation.navigate('RouteMap')}
          >
            <View>
              <Text style={s.routeText}>{route.from} → {route.to}</Text>
              <Text style={s.etaText}>ETA {route.eta}</Text>
            </View>
            <Text style={s.carIcon}>🚗</Text>
          </TouchableOpacity>
        ))}

        {/* Take a Tour */}
        <TouchableOpacity style={s.tourBtn}>
          <Text style={s.tourIcon}>📍</Text>
          <Text style={s.tourText}>Take a tour</Text>
        </TouchableOpacity>

        {/* Events */}
        <Text style={s.sectionTitle}>Take a look</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.eventsRow}>
          {EVENTS.map((ev) => (
            <View key={ev.id} style={s.eventCard}>
              <Text style={s.eventTitle}>{ev.title}</Text>
              <Text style={s.eventSub}>{ev.subtitle}</Text>
              <Text style={s.eventDate}>{ev.date}</Text>
            </View>
          ))}
        </ScrollView>
<MapView
  style={s.map}
  initialRegion={{
    latitude: 6.7500,       // RCCG Redemption Camp coordinates
    longitude: 3.5000,
    latitudeDelta: 0.01,    // zoom level
    longitudeDelta: 0.01,
  }}
>
  <Marker
    coordinate={{ latitude: 6.7500, longitude: 3.5000 }}
    title="RCCG Redemption Camp"
    description="Redemption City Transit"
  />
</MapView>
      </ScrollView>
     
<View style={s.bottomNav}>

  <TouchableOpacity style={s.tab} onPress={() => {}}>
    <Text style={s.tabIcon}>🏠</Text>
    <Text style={[s.tabLabel, s.tabActive]}>Home</Text>
    <View style={s.activeDot} />
  </TouchableOpacity>

  <TouchableOpacity style={s.tab} onPress={() => navigation.navigate('RouteMap')}>
    <Text style={s.tabIcon}>🔄</Text>
    <Text style={s.tabLabel}>Routing</Text>
  </TouchableOpacity>

  <TouchableOpacity style={s.tab} onPress={() => navigation.navigate('NearestNapep')}>
    <Text style={s.tabIcon}>🛺</Text>
    <Text style={s.tabLabel}>Napep</Text>
  </TouchableOpacity>

  <TouchableOpacity style={s.tab} onPress={() => navigation.navigate('MyProfile')}>
    <Text style={s.tabIcon}>👤</Text>
    <Text style={s.tabLabel}>Account</Text>
  </TouchableOpacity>

</View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg + 8,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '800',
    letterSpacing: 1,
  },
  logoutText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },

  // ── Hamburger ──
  hamburger: {
    padding: Spacing.xs,
    gap: 1,
    justifyContent: 'center',
  },
  bar: {
    width: 24,
    height: 2,
    backgroundColor: Colors.white,
    borderRadius: 2,
    marginVertical: 2,
  },

  // ── Modal Backdrop ──
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
  },

  // ── Drawer ──
drawer: {
  backgroundColor: Colors.white,
  paddingTop: Spacing.lg,
  paddingBottom: Spacing.lg,
  paddingHorizontal: Spacing.md,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 8,
  width: 220,              // ← fixed width
  alignSelf: 'flex-start', // ← stick to left side
},
  drawerTitle: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: Spacing.md,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // ── Nav Row (horizontal) ──
  navRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.xl,
  },
 navItem: {
  flexDirection: 'row',    // icon and label side by side
  alignItems: 'center',
  gap: Spacing.sm,         // space between icon and label
},
  navItemLogout: {
    backgroundColor: '#FEE2E2',
  },
  navIcon:  { fontSize: 22, marginBottom: 4 },
  navLabel: { fontSize: FontSize.xs, color: Colors.text, fontWeight: '600' },
  map: {
  height: 240,
  
  borderRadius: Radius.lg,
  marginBottom: Spacing.xl,
  overflow: 'hidden',
},

  // ── Search ──
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: Spacing.sm,
  },
  searchIcon:  { fontSize: 16, marginRight: Spacing.xs },
  searchInput: { flex: 1, paddingVertical: Spacing.sm, fontSize: FontSize.md, color: Colors.text },

  // ── Route Cards ──
  routeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  routeText: { color: Colors.white, fontSize: FontSize.sm, fontWeight: '700' },
  etaText:   { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.xs, marginTop: 2 },
  carIcon:   { fontSize: 24 },

  bottomNav: {
  flexDirection: 'row',
  backgroundColor: Colors.white,
  borderTopWidth: 1,
  borderTopColor: '#E5E5E5',
  paddingVertical: Spacing.sm,
  paddingBottom: Spacing.xxl,
},
tab: {
  flex: 1,
  alignItems: 'center',
  gap: 3,
},
tabIcon: { fontSize: 22 },
tabLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '500' },
tabActive: { color: Colors.primary, fontWeight: '700' },
activeDot: {
  width: 4, height: 4,
  borderRadius: 2,
  backgroundColor: Colors.primary,
  position: 'absolute',
  top: 0,
},
  // ── Tour ──
  tourBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm + 2,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  tourIcon: { fontSize: 16 },
  tourText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.sm },

  // ── Events ──
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  eventsRow:  { paddingLeft: Spacing.md, marginBottom: Spacing.md },
  eventCard: {
    width: 100,
    height: 90,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginRight: Spacing.sm,
    justifyContent: 'center',
  },
  eventTitle: { color: Colors.white, fontSize: FontSize.xs, fontWeight: '900', lineHeight: 14 },
  eventSub:   { color: 'rgba(255,255,255,0.7)', fontSize: 8, marginTop: 2 },
  eventDate:  { color: 'rgba(255,255,255,0.6)', fontSize: 8, marginTop: 2 },

  tabIconActive: {
  tintColor: Colors.primary,  // for Image icons
},
tabLabelActive: {
  color: Colors.primary,
  fontWeight: '700',
},
  // ── Map ──
  map: {
  height: 180,             // reduce from current size
  marginHorizontal: 16,
  borderRadius: 16,
  marginBottom: 24,
  overflow: 'hidden',
},
eventCard: {
  width: 110,              // slightly wider
  height: 100,             // taller
  backgroundColor: '#1B4332',
  borderRadius: 12,
  padding: 10,
  marginRight: 10,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.1)',  // subtle border
},

  mapPlaceholder: {
    marginHorizontal: Spacing.md,
    height: 200,
    backgroundColor: '#c8d6c8',
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  mapText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.primary },
  mapSub:  { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 4 },
});