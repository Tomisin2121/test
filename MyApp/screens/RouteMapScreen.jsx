// screens/RouteMapScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const DARK_GREEN = '#1B4332';
const MID_GREEN  = '#2D6A4F';
const DARK_RED   = '#8B1A1A';

// Redemption City, Mowe coordinates
const INITIAL_REGION = {
  latitude: 6.8354,
  longitude: 3.4313,
  latitudeDelta: 0.018,
  longitudeDelta: 0.012,
};

const ROUTE_A_COORDS = [
  { latitude: 6.8320, longitude: 3.4290 },
  { latitude: 6.8340, longitude: 3.4310 },
  { latitude: 6.8370, longitude: 3.4335 },
];

const ROUTE_B_COORDS = [
  { latitude: 6.8320, longitude: 3.4290 },
  { latitude: 6.8330, longitude: 3.4340 },
  { latitude: 6.8355, longitude: 3.4370 },
];

const USER_LOCATION = { latitude: 6.8330, longitude: 3.4295 };

const TABS = [
  { name: 'Home',    screen: 'Home',         icon: 'home-outline',          activeIcon: 'home' },
  { name: 'Routing', screen: 'RouteMap',      icon: 'git-branch-outline',    activeIcon: 'git-branch' },
  { name: 'Napep',   screen: 'NearestNapep',  icon: 'car-sport-outline',     activeIcon: 'car-sport' },
  { name: 'Account', screen: 'MyProfile',     icon: 'person-circle-outline', activeIcon: 'person-circle' },
];

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
            if (!isActive) navigation.navigate(tab.screen);
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

export default function RouteMapScreen({ navigation }) {
  const [activeTab, setActiveTab]         = useState('Routing');
  const [showAlternative, setShowAlt]     = useState(false);
  const [audioEnabled, setAudioEnabled]   = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* ── Top bar ── */}
      <SafeAreaView edges={['top']} style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={18} color="#ffff" />
          <Text style={styles.backLabel}>Routing</Text>
        </TouchableOpacity>

        {/* Toggle pill */}
        <TouchableOpacity
          style={styles.togglePill}
          activeOpacity={0.8}
          onPress={() => setShowAlt((v) => !v)}
        >
          <Ionicons name="git-branch-outline" size={15} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.togglePillText}>
            Toggle Alternative (Route B) if Notified
          </Text>
          <View style={styles.notifBadge}><Text style={styles.notifBadgeText}>🔔</Text></View>
        </TouchableOpacity>

        {/* Status chip */}
        <View style={styles.statusChip}>
          <Text style={styles.statusChipText}>Exits: Flowing</Text>
        </View>
      </SafeAreaView>

      {/* ── Full-screen map ── */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
        toolbarEnabled={false}
      >
        {/* Route A */}
        <Polyline
          coordinates={ROUTE_A_COORDS}
          strokeColor="#4A90D9"
          strokeWidth={4}
        />

        {/* Route B (alternative) */}
        {showAlternative && (
          <Polyline
            coordinates={ROUTE_B_COORDS}
            strokeColor="#27AE60"
            strokeWidth={4}
            lineDashPattern={[8, 4]}
          />
        )}

        {/* User location pulse */}
        <Circle
          center={USER_LOCATION}
          radius={60}
          fillColor="rgba(74,144,217,0.15)"
          strokeColor="rgba(74,144,217,0.4)"
          strokeWidth={1}
        />
        <Marker coordinate={USER_LOCATION} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.userDot} />
        </Marker>
      </MapView>

      {/* ── Zoom controls ── */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomBtn}>
          <Text style={styles.zoomBtnText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomBtn}>
          <Text style={styles.zoomBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* ── Live tracking bottom sheet ── */}
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Live Tracking</Text>

        {/* Route A card */}
        <View style={[styles.routeCard, styles.routeCardA]}>
          <Text style={styles.routeTag}>ROUTE A (Primary)</Text>
          <Text style={styles.routeMain}>Car pack B → Car Pack C Gate</Text>
          <Text style={styles.routeEta}>ETA 19mins</Text>
        </View>

        {/* Route B card */}
        {showAlternative && (
          <View style={[styles.routeCard, styles.routeCardB]}>
            <Text style={styles.routeTag}>Alternative (Route B)</Text>
            <Text style={styles.routeMain}>Car pack B → Lotto Gate</Text>
            <Text style={styles.routeEta}>ETA 25mins</Text>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="warning-outline" size={16} color="#F5A623" style={{ marginRight: 6 }} />
            <Text style={styles.actionBtnText}>Report Bottleneck</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setAudioEnabled((v) => !v)}
          >
            <Ionicons
              name={audioEnabled ? 'volume-high-outline' : 'volume-mute-outline'}
              size={16}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.actionBtnText}>Audio Toggle</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar activeTab={activeTab} onPress={setActiveTab} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },

  // ── Top bar ──
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 10,
    paddingHorizontal: 14,
    paddingBottom: 8,
    gap: 8,
    backgroundColor: '#022C0F',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 4,
    marginTop:5
    
  },
  backLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  togglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_GREEN,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'stretch',
  },
  togglePillText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  notifBadge: {
    backgroundColor: '#E53935',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 6,
  },
  notifBadgeText: { fontSize: 10 },
  statusChip: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  statusChipText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  // ── User dot ──
  userDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4A90D9',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // ── Zoom controls ──
  zoomControls: {
    position: 'absolute',
    right: 14,
    bottom: 340,
    gap: 2,
    zIndex: 10,
  },
  zoomBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  zoomBtnText: {
    fontSize: 22,
    color: '#333',
    lineHeight: 26,
  },

  // ── Bottom sheet ──
  sheet: {
    position: 'absolute',
    bottom: 70,          // sits above tab bar
    left: 0, right: 0,
    backgroundColor: DARK_GREEN,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    zIndex: 10,
  },
  sheetTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },

  // Route cards
  routeCard: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  routeCardA: { backgroundColor: '#1A3A5C' },
  routeCardB: { backgroundColor: '#1B4D2E' },
  routeTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A8D5BA',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  routeMain: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  routeEta: {
    color: '#A8C8E8',
    fontSize: 11,
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MID_GREEN,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Tab bar ──
  tabBar: {
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#D9D9D9',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 12,
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    zIndex: 20,
    
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: { fontSize: 10, color: '#888', marginTop: 2 },
  tabLabelActive: { color: DARK_RED, fontWeight: '600' },
});