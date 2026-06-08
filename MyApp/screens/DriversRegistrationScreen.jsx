// screens/DriversRegistrationScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, Modal,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

const AXES = [
  { id: '1', label: 'Eliad Redemption Camp Arena (Victoria)' },
  { id: '2', label: 'Galaxy Anastasia Area of the' },
  { id: '3', label: 'Gate of the South Area' },
  { id: '4', label: 'Canaan & Aronex areas' },
  { id: '5', label: 'Canaan & Aronex areas 2' },
  { id: '6', label: 'Canaan & Aronex areas 3' },
];

export default function DriversRegistrationScreen({ navigation }) {
  const [fullName,     setFullName]     = useState('');
  const [phone,        setPhone]        = useState('');
  const [license,      setLicense]      = useState('');
  const [tricycleReg,  setTricycleReg]  = useState('');
  const [makeModel,    setMakeModel]    = useState('');
  const [selectedAxes, setSelectedAxes] = useState([]);
  const [savedModal,   setSavedModal]   = useState(false);

  const toggleAxis = (id) => {
    setSelectedAxes(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSavedModal(true); // show the saved modal
  };

  const handleTransitPayment = () => {
    setSavedModal(false);
    navigation.navigate('DriverPayment');
  };

  const handleDone = () => {
    setSavedModal(false);
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.headerIcon}>🛺</Text>
          <Text style={s.headerTitle}>DRIVERS REGISTRATION</Text>
        </View>

        <View style={s.form}>

          {/* Profile Picture */}
          <TouchableOpacity style={s.profilePicBox}>
            <View style={s.uploadCircle}>
              <Text style={s.uploadIcon}>+</Text>
            </View>
            <Text style={s.profilePicLabel}>Update Picture</Text>
          </TouchableOpacity>

          {/* Full Name */}
          <TextInput
            style={s.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Phone */}
          <TextInput
            style={s.input}
            placeholder="Phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* License */}
          <TextInput
            style={s.input}
            placeholder="Driver's License no."
            placeholderTextColor="#999"
            value={license}
            onChangeText={setLicense}
          />

          {/* Tricycle Reg */}
          <TextInput
            style={s.input}
            placeholder="Tricycle Registration no."
            placeholderTextColor="#999"
            value={tricycleReg}
            onChangeText={setTricycleReg}
          />

          {/* Vehicle Row */}
          <View style={s.vehicleRow}>
            <TextInput
              style={[s.input, s.vehicleInput]}
              placeholder="Vehicle Make/Model"
              placeholderTextColor="#999"
              value={makeModel}
              onChangeText={setMakeModel}
            />
            <TouchableOpacity style={s.vehicleImageBtn}>
              <Text style={s.vehicleImageText}>Vehicle Image</Text>
              <Text style={s.vehicleImageIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          {/* Operational Axis */}
          <Text style={s.sectionLabel}>SELECT OPERATIONAL AXIS</Text>
          <View style={s.axesGrid}>
            {AXES.map((axis) => (
              <TouchableOpacity
                key={axis.id}
                style={[s.axisBox, selectedAxes.includes(axis.id) && s.axisBoxSelected]}
                onPress={() => toggleAxis(axis.id)}
              >
                <View style={[s.checkbox, selectedAxes.includes(axis.id) && s.checkboxSelected]}>
                  {selectedAxes.includes(axis.id) && <Text style={s.checkmark}>✓</Text>}
                </View>
                <Text style={s.axisLabel} numberOfLines={3}>{axis.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit */}
          <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
            <Text style={s.submitBtnText}>Submit Registration</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* ── Saved Modal ── */}
      <Modal
        visible={savedModal}
        transparent
        animationType="fade"
        onRequestClose={() => setSavedModal(false)}
      >
        <View style={s.modalBackdrop}>
          <View style={s.modalCard}>

            {/* Badge checkmark */}
            <View style={s.badgeOuter}>
              <View style={s.badgeInner}>
                <Text style={s.badgeCheck}>✓</Text>
              </View>
            </View>

            {/* Saved text */}
            <Text style={s.savedText}>Saved</Text>

            {/* Transit Payment button */}
            <TouchableOpacity
              style={s.transitBtn}
              onPress={() => navigation?.navigate('DriverPayment')}
            >
              <Text style={s.transitBtnText}>Transit payment</Text>
            </TouchableOpacity>

            {/* Done link */}
            <TouchableOpacity onPress={handleDone}>
              <Text style={s.doneText}>Done</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingBottom: Spacing.xxl,
  },

  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingTop: Spacing.lg + 8,
    gap: Spacing.sm,
  },
  headerIcon:  { fontSize: 22 },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  form: { padding: Spacing.md },

  // Profile Pic
  profilePicBox:   { alignItems: 'center', marginBottom: Spacing.md },
  uploadCircle: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    backgroundColor: Colors.inputBg,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  uploadIcon:      { fontSize: 28, color: Colors.textMuted },
  profilePicLabel: { fontSize: FontSize.sm, color: Colors.textMuted, fontWeight: '600' },

  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.sm,
  },

  vehicleRow:   { flexDirection: 'row', gap: Spacing.sm },
  vehicleInput: { flex: 1 },
  vehicleImageBtn: {
    flex: 1,
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  vehicleImageText: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600' },
  vehicleImageIcon: { fontSize: 18 },

  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },

  axesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  axisBox: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  axisBoxSelected: { borderColor: Colors.primary, backgroundColor: '#E8F5E9' },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkmark:  { color: Colors.white, fontSize: 11, fontWeight: '700' },
  axisLabel:  { flex: 1, fontSize: 9.5, color: Colors.text, lineHeight: 13 },

  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // ── Modal ──
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  // Badge (gear/shield shape using nested circles)
  badgeOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    // Octagon-like effect with border
    borderWidth: 6,
    borderColor: '#2D6A4F',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  badgeInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeCheck: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '900',
  },

  savedText: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
  },

  transitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.md,
  },
  transitBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  doneText: {
    fontSize: FontSize.md,
    color: Colors.link,
    fontWeight: '600',
  },
});
