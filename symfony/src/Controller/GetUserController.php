<?php

namespace App\Controller;

use ApiPlatform\Core\Security\EventListener\DenyAccessListener;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetUserController extends AbstractController
{
    public function __invoke(User $data)
    {
        if ($this->getUser()->getId() === $data->getId()){
            return $data;
        }

        return $this->createAccessDeniedException();
    }
}
