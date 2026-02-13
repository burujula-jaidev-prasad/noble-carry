import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
    phrases: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
    phrases,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = ''
}) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(pauseTimeout);
        }

        if (!isDeleting && currentText === currentPhrase) {
            setIsPaused(true);
            return;
        }

        if (isDeleting && currentText === '') {
            setIsDeleting(false);
            const nextIndex = (currentPhraseIndex + 1) % phrases.length;
            setCurrentPhraseIndex(nextIndex);
            // Small delay before starting next phrase to prevent glitch
            return;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(currentPhrase.substring(0, currentText.length - 1));
            } else {
                setCurrentText(currentPhrase.substring(0, currentText.length + 1));
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default TypingEffect;
