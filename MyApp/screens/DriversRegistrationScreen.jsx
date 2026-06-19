// screens/DriversRegistrationScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, Modal,Image
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

const AXES = [
  { id: '1', label: 'Main Gate to old Arena' },
  { id: '2', label: 'Elliot Hostel to Glory Arena' },
  { id: '3', label: 'Glory Area To Tree of Life' },
  { id: '4', label: 'Car Park B to New Arena ' },
  { id: '5', label: 'Tree of Life To Youth Centre' },
  { id: '6', label: 'Car Pack C to New Arena' },

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
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Image
                                source={require('../assets/backarrow.png')}
                                     style={s.backarrow} />  
                  </TouchableOpacity>
        <Image
                                source={require('../assets/Napep white 1.png')}
                                     style={s.napep} />  
          <Text style={s.headerTitle}>DRIVERS REGISTRATION</Text>
        </View>

        <View style={s.form}>

          {/* Profile Picture */}
          <TouchableOpacity style={s.profilePicBox}>
            <View style={s.uploadCircle}>
              <Text style={s.uploadIcon}>+</Text>
              <Text style={s.uploadP}>Upload Image</Text>
            </View>
            <Text style={s.profilePicLabel}>Profile Picture</Text>
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
             
            </TouchableOpacity>
          </View>

          {/* Operational Axis */}
          <Text style={s.sectionLabel}>SELECT OPERATIONAL AXIS</Text>
          <ScrollView>
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
          </ScrollView>

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
                <Image
                                source={require('../assets/verified icon 1 (1).png')}
                                     style={s.verify} />  
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
    backgroundColor: 'white',
    paddingBottom: Spacing.xxl,
  },
  uploadP:{
    color:'#022C0F'
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingVertical: Spacing.sm,
    paddingTop: Spacing.lg + 8,
    gap: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
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
    width: 113,
    height: 112,
    borderRadius: Radius.full,
    backgroundColor: '#D9D9D9',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  uploadIcon:      { fontSize: 40, color:'black' },
  profilePicLabel: { fontSize: 20, color:'#022C0F', fontWeight: '600' },

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
  vehicleInput: { flex: 1,},
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
    paddingVertical: 4,
  },
  vehicleImageText: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600' },
 

  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },
 
 napep: {
  width: 48,
  height: 48,
  marginLeft: 16
 },
  axesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    borderColor:'#B9B6B6',
    borderWidth:2,
    padding: Spacing.sm,
    borderRadius: 10,
    height: 150
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
   padding:18
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: Spacing.xl,
    
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    marginTop:220,
    height:450
  },
  verify: {
    width: 208,
    height: 208
  },
  // Badge (gear/shield shape using nested circles)
 
  

  savedText: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
  },

  transitBtn: {
    backgroundColor: '#045109',
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
    fontSize: 18,
    color: '#045109',
    fontWeight: '600',
  },
});
