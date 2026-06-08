// screens/MyProfileScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function MyProfileScreen({ navigation }) {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [routesOpen,   setRoutesOpen]   = useState(false);

  return (
    <ScrollView contentContainerStyle={s.container}>

      {/* ── Title ── */}
      <Text style={s.pageTitle}>My Profile</Text>

      {/* ── Avatar ── */}
      <View style={s.avatarSection}>
        <View style={s.avatarCircle}>
          <Text style={s.avatarEmoji}>👤</Text>
        </View>
        <Text style={s.name}>Favour Osato</Text>
        <Text style={s.contact}>favosato23@gmail.com | 0813384769</Text>
      </View>

      {/* ── Personal Details ── */}
      <TouchableOpacity
        style={s.section}
        onPress={() => setPersonalOpen(!personalOpen)}
      >
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Personal details</Text>
          <Text style={s.chevron}>{personalOpen ? '▲' : '▼'}</Text>
        </View>
        {personalOpen && (
          <View style={s.sectionContent}>
            {[
              ['Full Name',  'Favour Osato'],
              ['Email',      'favosato23@gmail.com'],
              ['Phone',      '0813384769'],
              ['Drivers ID', 'RCT-02'],
            ].map(([label, value]) => (
              <View key={label} style={s.detailRow}>
                <Text style={s.detailLabel}>{label}</Text>
                <Text style={s.detailValue}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>

      {/* ── Settings ── */}
      <TouchableOpacity
        style={s.section}
        onPress={() => setSettingsOpen(!settingsOpen)}
      >
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Settings</Text>
          <Text style={s.chevron}>{settingsOpen ? '▲' : '▼'}</Text>
        </View>
        {settingsOpen && (
          <View style={s.sectionContent}>
            <TouchableOpacity
              style={s.settingRow}
              onPress={() => navigation.navigate('NewPassword')}
            >
              <Text style={s.settingLabel}>🔒  Change Password</Text>
              <Text style={s.chevron}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.settingRow}>
              <Text style={s.settingLabel}>🔔  Notifications</Text>
              <Text style={s.chevron}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.settingRow}
              onPress={() => navigation.navigate('Landing')}
            >
              <Text style={[s.settingLabel, { color: Colors.secondary }]}>🚪  Log out</Text>
              <Text style={s.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      {/* ── Routes ── */}
      <TouchableOpacity
        style={s.section}
        onPress={() => setRoutesOpen(!routesOpen)}
      >
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Routes</Text>
          <Text style={s.chevron}>{routesOpen ? '▲' : '▼'}</Text>
        </View>
        {routesOpen && (
          <View style={s.sectionContent}>
            {[
              'Car pack B → Car Pack C Gate',
              'Car pack B → River Jordan',
              'Main Gate → Old Arena',
            ].map((route) => (
              <TouchableOpacity
                key={route}
                style={s.routeRow}
                onPress={() => navigation.navigate('RouteMap')}
              >
                <Text style={s.routeLabel}>📍  {route}</Text>
                <Text style={s.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },

  pageTitle: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: Radius.full,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  avatarEmoji: { fontSize: 48 },
  name: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  contact: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },

  // Sections
  section: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  chevron: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: Spacing.md,
  },

  // Personal details
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },

  // Settings rows
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },

  // Route rows
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  routeLabel: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },
});
