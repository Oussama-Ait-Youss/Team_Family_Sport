<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Discipline;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('fr_FR');
        $defaultPassword = Hash::make('password'); // Mot de passe universel pour les tests

        /*
        |--------------------------------------------------------------------------
        | 1. Peuplement des Rôles
        |--------------------------------------------------------------------------
        */
        $roles = [
            ['id' => 1, 'name' => 'admin'],
            ['id' => 2, 'name' => 'coach'],
            ['id' => 3, 'name' => 'player'],
        ];
        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(['id' => $role['id']], $role);
        }

        /*
        |--------------------------------------------------------------------------
        | 2. Création du Compte Super Administrateur (Owner)
        |--------------------------------------------------------------------------
        */
        User::updateOrCreate(
            ['email' => 'admin@teamfamilysports.com'],
            [
                'name' => 'Responsable Team Family Sports',
                'password' => $defaultPassword,
                'role_id' => 1, 
                'status' => 'active', 
                'birth_date' => '1985-05-15',
                'height' => 180.0,
                'weight' => 82.0,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | 3. Les Disciplines, les Coaches et les 23 Players par discipline
        |--------------------------------------------------------------------------
        */
        $disciplinesData = [
            'Karaté' => 'karate',
            'Kickboxing' => 'kickboxing',
            'Full Contact' => 'fullcontact',
            'Judo' => 'judo'
        ];

        $disciplineId = 1;

        foreach ($disciplinesData as $discName => $slug) {
            
            // A. Créer la discipline
            $discipline = Discipline::updateOrCreate(
                ['id' => $disciplineId],
                [
                    'name' => $discName,
                    'description' => "Section officielle de $discName du club.",
                    'image_url' => "$slug.jpg"
                ]
            );

            // B. Créer le Coach pour cette discipline
            $coach = User::updateOrCreate(
                ['email' => "coach.$slug@teamfamilysports.com"],
                [
                    'name' => $faker->firstName() . ' ' . $faker->lastName() . ' (Coach)',
                    'password' => $defaultPassword,
                    'role_id' => 2,
                    'discipline_id' => $discipline->id,
                    'status' => 'active',
                    'birth_date' => $faker->dateTimeBetween('-50 years', '-30 years')->format('Y-m-d'),
                    'height' => $faker->randomFloat(1, 165, 190),
                    'weight' => $faker->randomFloat(1, 65, 95),
                ]
            );

            // Détails spécifiques du Coach
            DB::table('coach_details')->updateOrInsert(
                ['user_id' => $coach->id],
                [
                    'dan' => $faker->randomElement(['1er Dan', '2ème Dan', '3ème Dan']),
                    'diplomas' => json_encode(['Diplôme d\'État', 'Secourisme (PSC1)']),
                    'experience_years' => $faker->numberBetween(5, 20)
                ]
            );

            // C. Créer les 23 Players (Apprenants) pour cette discipline
            for ($i = 1; $i <= 23; $i++) {
                
                // On s'assure que le premier joueur a un email prévisible pour que vous puissiez tester !
                $playerEmail = ($i === 1) 
                    ? "player.$slug@teamfamilysports.com" 
                    : $faker->unique()->safeEmail();

                $player = User::create([
                    'name' => $faker->firstName() . ' ' . $faker->lastName(),
                    'email' => $playerEmail,
                    'password' => $defaultPassword,
                    'role_id' => 3,
                    'discipline_id' => $discipline->id,
                    'status' => $faker->randomElement(['active', 'active', 'pending']), // Majoritairement actifs, quelques pending pour tester l'admin
                    'birth_date' => $faker->dateTimeBetween('-40 years', '-8 years')->format('Y-m-d'),
                    'height' => $faker->randomFloat(1, 120, 195),
                    'weight' => $faker->randomFloat(1, 30, 105),
                ]);

                // Détails spécifiques du Player
                DB::table('player_details')->insert([
                    'user_id' => $player->id,
                    'current_grade_id' => null, // À lier plus tard avec vos grades
                    'join_date' => $faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d')
                ]);
            }

            $disciplineId++;
        }
    }
}