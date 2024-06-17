<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Grade implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $validGrades = [
            1.00, 1.25, 1.50, 1.75, 2.00,
            2.25, 2.50, 2.75, 3.00, 3.25,
            3.50, 3.75, 4.00, 5.00,
            'INC'
        ];

        if (!in_array($value, $validGrades, true)) {
            $fail("The $attribute must be a valid grade.");
        }
    }
}
