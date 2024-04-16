/**
 * @package     BlueAcorn/Reviews
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { cloneElement } from 'preact';
import { useCallback, useMemo, useEffect, useState } from 'preact/hooks';
import { t } from 'ttag';
import { BsCheck, BsChevronDown, BsStar, BsStarFill, BsXLg } from 'react-icons/bs';
import { usePhotoMutaion } from '../hooks/usePhotoMutation';
import Loading from '../../View/Loading';
import { useSubmitDispatchContext, useSubmitStateContext } from './Context';
import { SET_FIELD } from './constants';
import styles from './style.module.css';

export const Field = ({ field }) => {
    const { id, type, label, required } = field;
    const fieldInput = fieldTypes[type];
    const excludeLabel = ['photos'];
    if (fieldInput) {
        return (
            <div className={styles.field}>
                {!excludeLabel.includes(type) ? (
                    <label htmlFor={`review-${id}`}>
                        <span>
                            {label} {required ? '*' : ''}
                        </span>
                    </label>
                ) : null}
                {cloneElement(fieldInput, { field })}
            </div>
        );
    }
};

const FieldText = ({ field: { id, required, minLength, maxLength, placeholder } }) => {
    const state = useSubmitStateContext();
    const dispatch = useSubmitDispatchContext();
    const onChangeCallback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: SET_FIELD,
                name,
                value,
            });
        },
        [dispatch],
    );

    return (
        <input
            className={styles.input}
            type="text"
            id={`review-${id}`}
            value={state[id]}
            name={id}
            onChange={onChangeCallback}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
        />
    );
};

const FieldTextArea = ({ field: { id, required, minLength, maxLength, placeholder } }) => {
    const state = useSubmitStateContext();
    const dispatch = useSubmitDispatchContext();
    const onChangeCallback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: SET_FIELD,
                name,
                value,
            });
        },
        [dispatch],
    );

    return (
        <textarea
            className={styles.textarea}
            value={state[id]}
            id={`review-${id}`}
            name={id}
            onChange={onChangeCallback}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
        />
    );
};

const ratingOptions = Array.from({ length: 5 }, (_, i) => i + 1);
const FieldRating = ({ field: { id, required } }) => {
    const dispatch = useSubmitDispatchContext();
    const onChangeCallback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: SET_FIELD,
                name,
                value: Number(value),
            });
        },
        [dispatch],
    );

    return ratingOptions.map((value) => (
        <FieldRatingInput id={id} key={value} value={value} onChange={onChangeCallback} required={required} />
    ));
};

const FieldRatingInput = ({ id, value, onChange, required }) => {
    const state = useSubmitStateContext();
    const currentValue = state[id] || 0;

    return useMemo(() => {
        return (
            <span className="rating">
                <label className={styles.ratingIconLabel}>
                    <input
                        type="radio"
                        name={id}
                        value={value}
                        checked={currentValue === value}
                        onChange={onChange}
                        required={required}
                    />
                    {currentValue >= value ? <BsStarFill /> : <BsStar />}
                </label>
            </span>
        );
    }, [currentValue, id, value, onChange]);
};

const FieldChoice = ({ field: { id, required, options } }) => {
    const state = useSubmitStateContext();
    const dispatch = useSubmitDispatchContext();
    const onChangeCallback = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch({
                type: SET_FIELD,
                name,
                value,
            });
        },
        [dispatch],
    );

    return (
        <div className={styles.selectWrapper}>
            <select
                className={styles.select}
                value={state[id]}
                id={`review-${id}`}
                name={id}
                onChange={onChangeCallback}
                required={required}
            >
                <FieldChoiceOptions options={options} />
            </select>
            <BsChevronDown />
        </div>
    );
};

const FieldChoiceOptions = ({ options }) => {
    return options.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ));
};

const FieldPhotos = ({ field: { id } }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [error, setError] = useState('');
    const [state, submitPhoto] = usePhotoMutaion();

    useEffect(() => {
        if (state.data) {
            setError('');

            const isDuplicate = selectedPhotos.some((photo) => photo.label === state.data.photo.label);
            if (!isDuplicate) {
                setSelectedPhotos([...selectedPhotos, state.data.photo]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handlePhotoUpload = useCallback(
        (photo) => {
            try {
                const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
                const allowedFormats = ['image/png', 'image/gif', 'image/jpeg', 'image/heic', 'image/tiff'];

                if (photo.size > fileSizeLimit) {
                    setError(`${t`File size should be 10 MB or less.`}`);
                    return;
                }

                if (!allowedFormats.includes(photo.type)) {
                    setError(`${t`Only PNG, GIF, JPG, HEIC, and TIFF formats are accepted.`}`);
                    return;
                }

                const reader = new FileReader();
                reader.readAsDataURL(photo);

                reader.onloadend = async () => {
                    const base64Content = reader.result?.split(',')[1];
                    const contentType = photo.type;
                    const fileName = photo.name;
                    await submitPhoto({ base64Content, contentType, fileName });
                    setSelectedPhotos([...selectedPhotos, state.data?.photo]);
                };
            } catch (error) {
                setError(`${t`An error occurred while uploading the photo.`}`);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [submitPhoto, state],
    );

    const handleRemovePhoto = useCallback(
        (event) => {
            event.stopPropagation();
            const updatedPhotos = [...selectedPhotos];
            const index = event.currentTarget.getAttribute('data-index') ?? 0;
            updatedPhotos.splice(index, 1);
            setSelectedPhotos(updatedPhotos);
        },
        [selectedPhotos],
    );

    const handleFileSelect = useCallback(
        (event) => {
            const files = event.target.files;
            for (const file of files) {
                handlePhotoUpload(file);
            }
        },
        [handlePhotoUpload],
    );
    return useMemo(
        () => (
            <div>
                <span className={styles.uploadTitle}>{'Add photos * '}</span>
                <label htmlFor={`review-${id}`}>
                    <input
                        name={'photo-upload'}
                        id={`review-${id}`}
                        type="file"
                        accept=".png,.gif,.jpg,.jpeg,.heic,.tiff"
                        multiple
                        onChange={handleFileSelect}
                    />
                    {state.loading ? <Loading /> : <span className={styles.uploadButton}>+</span>}
                </label>
                {error && <p>{error}</p>}
                <ul className={styles.photosList}>
                    {selectedPhotos.map((photo, index) => (
                        <li key={index} className={styles.photosListItem}>
                            <input type="hidden" value={photo?.thumbnail} name={`photourl_${index + 1}`} />
                            <img src={photo?.thumbnail} className="photo-thumb" alt={photo.label} />
                            <span>{photo.label}</span>
                            <button
                                type={'button'}
                                name={'remove'}
                                onClick={handleRemovePhoto}
                                data-index={index}
                                className={styles.removePhotoButton}
                            >
                                <BsXLg />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        ),
        [selectedPhotos, error, handleFileSelect, id, state, handleRemovePhoto],
    );
};

const FieldMultiChoice = ({ field }) => {
    const { id, options } = field;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = useCallback(() => {
        setOpenDropdown(!openDropdown);
    }, [openDropdown]);

    const handleOptionChange = useCallback((optionValue) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(optionValue)
                ? prevSelectedOptions.filter((value) => value !== optionValue)
                : [...prevSelectedOptions, optionValue],
        );
    }, []);

    const groupedOptions = groupByFabricFamily(options);
    const selectedOptionLabels = selectedOptions.map(
        (optionValue) => options.find((option) => option.value === optionValue)?.label,
    );

    return (
        <div className={styles.multichoiceWrapper}>
            <button type={'button'} className={styles.multichoiceTrigger} onClick={toggleDropdown}>
                <span>{selectedOptionLabels.length ? selectedOptionLabels.join(', ') : 'Select'}</span>
                <BsChevronDown />
            </button>
            <input name={id} id={id} type="hidden" value={selectedOptions.join(',')} />
            {openDropdown && (
                <CheckboxGroup
                    groupedOptions={groupedOptions}
                    options={options}
                    selectedOptions={selectedOptions}
                    handleOptionChange={handleOptionChange}
                    id={id}
                />
            )}
        </div>
    );
};

const groupByFabricFamily = (options) => {
    const groupedOptions = {};

    for (const option of options) {
        const lastWord = option.label.split(' ').pop();
        if (!groupedOptions[lastWord]) {
            groupedOptions[lastWord] = [];
        }
        groupedOptions[lastWord].push(option);
    }

    return groupedOptions;
};

const CheckboxGroup = ({ groupedOptions, options, selectedOptions, handleOptionChange, id }) => {
    return (
        <div className={styles.multichoiceItemsWrapper}>
            {groupedOptions
                ? Object.entries(groupedOptions)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([groupName, groupOptions]) => (
                          <div key={groupName}>
                              {id === 'tagid_FabricType' && (
                                  <span className={styles.multichoiceGroupName}>{groupName}</span>
                              )}
                              {groupOptions.map((option) => (
                                  <CheckboxOption
                                      key={option.value}
                                      option={option}
                                      selected={selectedOptions.includes(option.value)}
                                      onOptionChange={handleOptionChange}
                                  />
                              ))}
                          </div>
                      ))
                : options.map((option) => (
                      <CheckboxOption
                          key={option.value}
                          option={option}
                          selected={selectedOptions.includes(option.value)}
                          onOptionChange={handleOptionChange}
                      />
                  ))}
        </div>
    );
};

const CheckboxOption = ({ option, selected, onOptionChange }) => {
    const [isChecked, setIsChecked] = useState(false);
    const optionChange = useCallback(() => {
        onOptionChange(option.value);
        setIsChecked(!isChecked);
    }, [onOptionChange, option.value, isChecked, setIsChecked]);

    return (
        <label className={styles.reviewsFormLabelFilter}>
            <input
                className={styles.reviewsFormCheckbox}
                type="checkbox"
                value={option.value}
                checked={selected}
                onChange={optionChange}
            />
            <span className={styles.checkboxIcon} />
            {option.label}
            {isChecked ? <BsCheck /> : null}
        </label>
    );
};

const fieldTypes = {
    text: <FieldText />,
    textarea: <FieldTextArea />,
    rating: <FieldRating />,
    choice: <FieldChoice />,
    photos: <FieldPhotos />,
    multichoice: <FieldMultiChoice />,
};
