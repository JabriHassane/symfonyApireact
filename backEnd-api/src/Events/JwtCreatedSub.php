<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSub
{
    public function updateJWTdata(JWTCreatedEvent $event){
        // 1. Récupérer l'utilisateur
        //2. Enrichir les data pour qu'elles contiennent ces données
        $user = $event->getUser();
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        $event->setData($data);
    }
}