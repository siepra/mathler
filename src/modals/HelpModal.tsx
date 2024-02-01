import React from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {ModalProps} from '../hooks/useModal';
import Tile from '../components/Tile';

const HelpModal: React.FC<ModalProps> = React.memo(
  ({isModalOpen, openModal, closeModal}) => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            closeModal();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.section}>
                <Text style={styles.headerText}>How to play Mathler</Text>
                <Text style={styles.modalText}>
                  Try to find the hidden calculation in 6 guesses!{'\n'}
                  After each guess, the color of the tiles will change to show
                  how close you are to the solution.
                </Text>
              </View>
              <View style={styles.section}>
                <View style={styles.tilesContainer}>
                  <Tile character={'5'} backgroundColor={'green'} />
                  <Tile character={'0'} backgroundColor={'grey'} />
                  <Tile character={'/'} backgroundColor={'green'} />
                  <Tile character={'5'} backgroundColor={'yellow'} />
                  <Tile character={'-'} backgroundColor={'grey'} />
                  <Tile character={'2'} backgroundColor={'grey'} />
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.modalText}>
                  • Green are in the correct place.{'\n'}• Yellow are in the
                  solution, but in a different place.{'\n'}• Gray are not in the
                  solution.
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.headerText}>Additional rules</Text>
                <Text style={styles.modalText}>
                  • Numbers and operators can appear multiple times.{'\n'}•
                  Calculate / or * before - or + (order of operations).{'\n'}•
                  Commutative solutions are accepted, for example 20+7+3 and
                  3+7+20.{'\n'}• Commutative solutions will be automatically
                  rearranged to the exact solution
                </Text>
              </View>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  closeModal();
                }}>
                <Text style={styles.textStyle}>Hide Instructions</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            openModal();
          }}>
          <Text style={styles.textStyle}>Help</Text>
        </TouchableHighlight>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  section: {
    marginBottom: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  tilesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelpModal;
