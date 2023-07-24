import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {StyledHeader} from '../../../sharedStyles';
import {CustomInput, CustomButton} from '../../../components';
import {StyledImage} from './StyledItemDetails';
import {useUpdateProduct} from '../../../hooks/updateProduct';

const EditItemForm = ({data, productId, navigation}: any) => {
  console.log('LOOK HERE', data);
  const {mutate} = useUpdateProduct();
  const {image, name} = data;
  const defaultImage =
    'https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg';

  const originalImg = image || defaultImage;
  const [isSearching, setIsSearching] = useState(false);

  const [newImage, setNewImage] = useState('');
  const [newImgValid, setNewImgValid] = useState(false);
  const [imageValidEdit, setImageValidEdit] = useState(false);

  const [newName, setNewName] = useState(name);
  const [newNameValid, setNewNameValid] = useState(false);

  const fieldsToUpdate = {
    ...(newName !== name && newName.length > 0 && {name: newName}), // Include the 'name' field only if newName is not empty
    ...(newImage !== '' && newImgValid && {image: newImage}), // Include the 'image' field only if newImage is not empty
  };

  useEffect(() => {
    if (newName === name || (newName !== name && newName.length !== 0)) {
      setNewNameValid(true);
    } else {
      setNewNameValid(false);
    }
  }, [name, newName]);

  useEffect(() => {
    if (newImage.length === 0 || newImgValid) {
      setImageValidEdit(true);
    } else {
      setImageValidEdit(false);
    }
  }, [newImage.length, newImgValid]);

  useEffect(() => {
    // Function to check if the new image URL exists
    const checkNewImageExists = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(newImage);
        if (response.ok) {
          setNewImgValid(true);

          setIsSearching(false);
        } else if (!response.ok) {
          setNewImgValid(false);
          setIsSearching(false);
        }
      } catch (error) {
        setNewImgValid(false);

        setIsSearching(false);
      }
    };

    // Only check if the newImage state is different from the originalImg
    if (newImage !== originalImg) {
      checkNewImageExists();
    }
  }, [newImage, originalImg]);

  const disableHandler = () => {
    if (newNameValid && imageValidEdit && !isSearching) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={1000}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <StyledHeader />

      <CustomInput
        placeholder="Name"
        title="Name:"
        value={newName}
        onChangeText={e => setNewName(e)}
        errMsg={newName.length === 0 ? 'Name is required' : ''}
      />
      <StyledImage
        resizeMode="cover"
        source={{
          uri: newImgValid ? newImage : originalImg,
        }}
      />
      <CustomInput
        placeholder="ImageURL"
        title="ImageURL:"
        errMsg={
          newImgValid || newImage.length === 0 ? '' : 'Image URL is not valid'
        }
        value={newImage}
        onChangeText={e => setNewImage(e)}
      />
      <CustomButton
        disabled={disableHandler()}
        title="Save"
        style={{marginTop: '10%'}}
        onPress={() => {
          if (Object.keys(fieldsToUpdate).length > 0) {
            const dataToChange = {productId, changes: fieldsToUpdate};
            mutate(dataToChange);
          }
          navigation.goBack();
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default EditItemForm;
