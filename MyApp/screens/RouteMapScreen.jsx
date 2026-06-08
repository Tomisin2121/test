// screens/RouteMapScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function RouteMapScreen({ navigation }) {
  const [notified, setNotified] = useState(false);

  return (
    <View style={s.container}>

      {/* ── Top Bar ── */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.toggleBtn, notified && s.toggleActive]}
          onPress={() => setNotified(!notified)}
        >
          <Text style={s.toggleText}>
            🔄 Toggle Alternative (Route B) {notified ? '🔔 Notified' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Status Badge ── */}
      <View style={s.statusBadge}>
        <Text style={s.statusText}>Exit: Flowing</Text>
      </View>

      {/* ── Map Placeholder ── */}
      <View style={s.mapArea}>
        <Text style={s.mapLabel}>🗺️ Route Map</Text>
        <View style={s.routeLine} />
        <View style={s.mapDot} />
      </View>

      {/* ── Route Cards ── */}
      <ScrollView style={s.routePanel}>

        {/* Route A */}
        <View style={[s.routeCard, s.routeA]}>
          <Text style={s.routeTag}>ROUTE A (Primary)</Text>
          <Text style={s.routeTitle}>Car pack B → Car Pack C Gate</Text>
          <Text style={s.routeEta}>ETA 11mins</Text>
        </View>

        {/* Route B */}
        <View style={[s.routeCard, s.routeB]}>
          <Text style={s.routeTagAlt}>Alternative (Route B)</Text>
          <Text style={s.routeTitleAlt}>Car pack B → Lotto Gate</Text>
          <Text style={s.routeEtaAlt}>ETA 26mins</Text>
        </View>

        {/* Action Buttons */}
        <View style={s.actionRow}>
          <TouchableOpacity style={s.actionBtn}>
            <Text style={s.actionIcon}>⚠️</Text>
            <Text style={s.actionText}>Report Bottleneck</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.actionBtn}>
            <Text style={s.actionIcon}>🔊</Text>
            <Text style={s.actionText}>Audio Toggle</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8ede8' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  backText: { fontSize: FontSize.xl, color: Colors.text, fontWeight: '700' },
  toggleBtn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  toggleActive: { backgroundColor: '#d4edda' },
  toggleText: { fontSize: FontSize.xs, color: Colors.text, fontWeight: '600' },

  statusBadge: {
    alignSelf: 'center',
    backgroundColor: Colors.accent,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginTop: Spacing.sm,
  },
  statusText: { color: Colors.white, fontSize: FontSize.xs, fontWeight: '700' },

  // Map
  mapArea: {
    flex: 1,
    backgroundColor: '#c8d6c8',
    margin: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  mapLabel: { fontSize: FontSize.lg, color: Colors.primary, fontWeight: '700' },
  routeLine: {
    position: 'absolute',
    width: 4,
    height: '60%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  mapDot: {
    position: 'absolute',
    bottom: '20%',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.secondary,
  },

  // Route Panel
  routePanel: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    padding: Spacing.md,
  },

  routeCard: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  routeA: { backgroundColor: Colors.primary },
  routeB: { backgroundColor: Colors.accent },

  routeTag:    { color: 'rgba(255,255,255,0.7)', fontSize: FontSize.xs, marginBottom: 2 },
  routeTitle:  { color: Colors.white, fontSize: FontSize.sm, fontWeight: '800' },
  routeEta:    { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.xs, marginTop: 2 },

  routeTagAlt:   { color: 'rgba(255,255,255,0.7)', fontSize: FontSize.xs, marginBottom: 2 },
  routeTitleAlt: { color: Colors.white, fontSize: FontSize.sm, fontWeight: '800' },
  routeEtaAlt:   { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.xs, marginTop: 2 },

  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.xs,
  },
  actionIcon: { fontSize: 14 },
  actionText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.text },
});
