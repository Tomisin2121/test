import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDriver } from './context/DriverContext';

// ── Tokens ────────────────────────────────────────────────────────
const C = {
  primary:      '#022C0F',
  primaryBtn:   '#045109',
  white:        '#FFFFFF',
  text:         '#111111',
  muted:        '#666666',
  bg:           '#F5F5F5',
  cardBg:       '#FFFFFF',
  inputBorder:  '#E0E0E0',
  profileCard:  '#E8E8E8',
  switchTrack:  '#045109',
  advertBg:     '#F0F0F0',
  advertBorder: '#DDDDDD',
};

// ── Menu Items ────────────────────────────────────────────────────
const MAIN_MENU = [
  { id: 'profile',   label: 'Profile',   icon: 'person-circle-outline' },
  { id: 'route',     label: 'Route',     icon: 'git-branch-outline' },
  { id: 'help',      label: 'Help',      icon: 'help-circle-outline' },
  { id: 'safety',    label: 'Safety',    icon: 'shield-checkmark-outline' },
  { id: 'settings',  label: 'Settings',  icon: 'settings-outline' },
  { id: 'update',    label: 'Update',    icon: 'information-circle-outline' },
];

// ── Screen ────────────────────────────────────────────────────────
export default function ProfileScreen({ navigation }) {
  const { driverProfile } = useDriver();

  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn]           = useState(false);

  const fullName = driverProfile.fullName || 'Favour Osato';
  const email    = 'favosato23@gmail.com';
  const phone    = '|08133384769';
  const role     = 'City Commuter';

  const handleMenuPress = (id) => {
    const routes = {
      profile:  'EditProfile',
      route:    'RouteScreen',
      help:     'HelpScreen',
      safety:   'SafetyScreen',
      settings: 'SettingsScreen',
      update:   'UpdateScreen',
    };
    if (routes[id]) navigation.navigate(routes[id]);
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* ── Top bar ── */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Ionicons name="chevron-back" size={20} color={C.text} />
          <Text style={s.backText}>Account</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Profile Card ── */}
        <View style={s.profileCard}>
          <View style={s.profileImageWrapper}>
            {driverProfile.profileImage ? (
              <Image
                source={{ uri: driverProfile.profileImage }}
                style={s.profileImage}
              />
            ) : (
              <View style={s.profileImageFallback}>
                <Text style={s.profileInitial}>
                  {fullName[0]?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
          </View>

          <Text style={s.profileName}>{fullName}</Text>
          <Text style={s.profileContact}>{email}{phone}</Text>
          <Text style={s.profileRole}>{role}</Text>
        </View>

        {/* ── Main Menu Card ── */}
        <View style={s.menuCard}>
          {MAIN_MENU.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={s.menuRow}
                onPress={() => handleMenuPress(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons name={item.icon} size={20} color={C.text} style={s.menuIcon} />
                <Text style={s.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={C.muted} />
              </TouchableOpacity>
              {index < MAIN_MENU.length - 1 && <View style={s.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* ── Community ── */}
        <TouchableOpacity
          style={s.communityCard}
          onPress={() => navigation.navigate('CommunityScreen')}
          activeOpacity={0.8}
        >
          <View style={s.communityLeft}>
            <Ionicons name="people-circle-outline" size={22} color={C.text} />
            <Text style={s.communityLabel}>Community</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={C.muted} />
        </TouchableOpacity>

        {/* ── Preferences Card ── */}
        <View style={s.menuCard}>

          {/* Preferred Start Location */}
          <TouchableOpacity
            style={s.menuRow}
            onPress={() => navigation.navigate('StartLocation')}
            activeOpacity={0.7}
          >
            <Ionicons name="location-outline" size={20} color={C.text} style={s.menuIcon} />
            <Text style={s.menuLabel}>Preferred Start Location</Text>
            <Ionicons name="chevron-forward" size={16} color={C.muted} />
          </TouchableOpacity>

          <View style={s.menuDivider} />

          {/* Notification Toggle */}
          <View style={s.menuRow}>
            <Ionicons name="notifications-outline" size={20} color={C.text} style={s.menuIcon} />
            <Text style={s.menuLabel}>Notification</Text>
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: '#CCCCCC', true: C.switchTrack }}
              thumbColor={C.white}
              style={s.toggle}
            />
          </View>

          <View style={s.menuDivider} />

          {/* Language */}
          <TouchableOpacity
            style={s.menuRow}
            onPress={() => navigation.navigate('LanguageScreen')}
            activeOpacity={0.7}
          >
            <Ionicons name="language-outline" size={20} color={C.text} style={s.menuIcon} />
            <Text style={s.menuLabel}>Language</Text>
            <Ionicons name="chevron-forward" size={16} color={C.muted} />
          </TouchableOpacity>

          <View style={s.menuDivider} />

          {/* Dark Mode Toggle */}
          <View style={s.menuRow}>
            <Ionicons name="sunny-outline" size={20} color={C.text} style={s.menuIcon} />
            <Text style={s.menuLabel}>Dark mode</Text>
            <Switch
              value={darkModeOn}
              onValueChange={setDarkModeOn}
              trackColor={{ false: '#CCCCCC', true: C.switchTrack }}
              thumbColor={C.white}
              style={s.toggle}
            />
          </View>

        </View>

        {/* ── Advert Portal ── */}
        <View style={s.advertCard}>
          <View style={s.advertLeft}>
            <View style={s.advertIconBox}>
              <Ionicons name="megaphone-outline" size={22} color={C.primary} />
            </View>
            <View style={s.advertText}>
              <Text style={s.advertTitle}>ADVERT PORTAL</Text>
              <Text style={s.advertSub}>
                Promote your business, Program or event for to fellow commuters on our city home board
              </Text>
            </View>
          </View>
          <TouchableOpacity style={s.advertBtn} activeOpacity={0.85}>
            <Text style={s.advertBtnText}>SUBMIT AD</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // Top bar
  topBar: {
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: C.bg,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  backText: {
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },

  // Scroll
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },

  // Profile card
  profileCard: {
    backgroundColor: C.profileCard,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: C.primary,
    marginBottom: 10,
    backgroundColor: '#C8E6C9',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImageFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8E6C9',
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: '700',
    color: C.primary,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 2,
  },
  profileContact: {
    fontSize: 11,
    color: C.muted,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 13,
    fontWeight: '600',
    color: C.primary,
  },

  // Menu card
  menuCard: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    color: C.text,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: C.inputBorder,
    marginHorizontal: 12,
  },

  // Community
  communityCard: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  communityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  communityLabel: {
    fontSize: 14,
    color: C.text,
    fontWeight: '500',
  },

  // Toggle
  toggle: {
    transform: [{ scaleX: Platform.OS === 'ios' ? 0.8 : 1 }, { scaleY: Platform.OS === 'ios' ? 0.8 : 1 }],
  },

  // Advert card
  advertCard: {
    backgroundColor: C.advertBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.advertBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    gap: 8,
  },
  advertLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  advertIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advertText: {
    flex: 1,
  },
  advertTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: C.text,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  advertSub: {
    fontSize: 9,
    color: C.muted,
    lineHeight: 13,
  },
  advertBtn: {
    backgroundColor: C.primary,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  advertBtnText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});