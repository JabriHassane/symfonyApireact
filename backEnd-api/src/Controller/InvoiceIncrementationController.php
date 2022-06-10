<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class InvoiceIncrementationController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("/api/invoices/{id}/increment")
     */
    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono()+1);
        $this->manager->flush();
        dd($data);
    }
}